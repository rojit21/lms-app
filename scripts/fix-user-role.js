import dbConnect from '../lib/db.js';
import User from '../models/User.js';

async function fixUserRoles() {
  try {
    await dbConnect();
    
    // Find all users
    const users = await User.find({});
    console.log('All users:', users.map(u => ({ email: u.email, role: u.role, name: u.name })));
    
    // Find users without roles
    const usersWithoutRole = await User.find({ role: { $exists: false } });
    console.log('Users without role:', usersWithoutRole);
    
    // Find users with undefined roles
    const usersWithUndefinedRole = await User.find({ role: undefined });
    console.log('Users with undefined role:', usersWithUndefinedRole);
    
    // Update users without roles to be learners
    if (usersWithoutRole.length > 0 || usersWithUndefinedRole.length > 0) {
      const result = await User.updateMany(
        { $or: [{ role: { $exists: false } }, { role: undefined }] },
        { $set: { role: 'learner' } }
      );
      console.log('Updated users:', result);
    }
    
    // Check specific user by email
    const specificUser = await User.findOne({ email: 'rojit1432@gmail.com' });
    if (specificUser) {
      console.log('Specific user found:', {
        email: specificUser.email,
        role: specificUser.role,
        name: specificUser.name
      });
      
      // Update this user to be a creator if they don't have the role
      if (!specificUser.role || specificUser.role === 'learner') {
        await User.updateOne(
          { email: 'rojit1432@gmail.com' },
          { $set: { role: 'creator' } }
        );
        console.log('Updated user to creator role');
      }
    }
    
    console.log('Role fix completed');
  } catch (error) {
    console.error('Error fixing user roles:', error);
  }
}

fixUserRoles(); 