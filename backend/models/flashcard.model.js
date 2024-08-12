module.exports = (sequelize, DataTypes) => {
    const Flashcard = sequelize.define("Flashcard", {
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    return Flashcard;
  };
  