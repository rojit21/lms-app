import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a module title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a module description'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please provide video duration'],
  },
  order: {
    type: Number,
    required: true,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
});

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
  },
  options: [{
    type: String,
    required: [true, 'Please provide options'],
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Please provide the correct answer index'],
  },
  explanation: {
    type: String,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Please provide a thumbnail URL'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Programming', 'Design', 'Marketing', 'Business', 'Technology', 'Other'],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an instructor'],
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative'],
  },
  isFree: {
    type: Boolean,
    default: true,
  },
  modules: [moduleSchema],
  quizzes: [quizSchema],
  enrolledStudents: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0,
    },
    completedModules: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
  }],
  ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      maxlength: [500, 'Review cannot be more than 500 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  totalStudents: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 0, // in minutes
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  tags: [{
    type: String,
  }],
  requirements: [{
    type: String,
  }],
  learningOutcomes: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    this.totalRatings = 0;
  } else {
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.averageRating = totalRating / this.ratings.length;
    this.totalRatings = this.ratings.length;
  }
};

// Calculate total duration
courseSchema.methods.calculateTotalDuration = function() {
  this.totalDuration = this.modules.reduce((sum, module) => sum + module.duration, 0);
};

// Pre-save middleware
courseSchema.pre('save', function(next) {
  this.calculateAverageRating();
  this.calculateTotalDuration();
  next();
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema); 