
module.exports = function (sequelize, DataTypes) {
  // not sure if we need Sequelize or DataTypes as our second arg
  var User = sequelize.define("User", {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email:{
        type: DataTypes.STRING,
        validate:{isEmail: true,
                  notNull: true}
        },
      username: DataTypes.STRING,
      password: DataTypes.STRING
      }, 
      {
        paranoid: true
      }
  );

    // Trying out validPassword Prototype 
    User.prototype.validPassword = function(password) {
      console.log("Password from the DB:" , this.password)
      console.log("Password from the Client :" , password)
      return (this.password === password)
    };
      
    User.associate = function(models){
      User.hasMany(models.Story, {
        foreignKey: { 
          allowNull: false
        }
      });
      
    }
    User.sync();

  return User;
};

