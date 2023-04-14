'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos',[{
      tittle:"Bunga 1",
      caption:"Ini Bunga Matahari",
      User_id: 5,
      image_url :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liputan6.com%2Fhot%2Fread%2F4075974%2Fciri-khusus-bunga-matahari-selalu-ikuti-arah-cahaya-matahari&psig=AOvVaw2LEtvUWUo68V-JG6Q76-Cp&ust=1681483855251000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCID6176Mp_4CFQAAAAAdAAAAABAE",
      createdAt: new Date(),
      updatedAt : new Date()
    },{
      tittle:"Bunga 3",
      caption:"Ini Bunga Mawar",
      User_id: 5,
      image_url :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liputan6.com%2Fhot%2Fread%2F4075974%2Fciri-khusus-bunga-matahari-selalu-ikuti-arah-cahaya-matahari&psig=AOvVaw2LEtvUWUo68V-JG6Q76-Cp&ust=1681483855251000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCID6176Mp_4CFQAAAAAdAAAAABAE",
      createdAt: new Date(),
      updatedAt : new Date()
    },{
      tittle:"Bunga 2",
      caption:"Ini Bunga Tulip",
      User_id: 5,
      image_url :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liputan6.com%2Fhot%2Fread%2F4075974%2Fciri-khusus-bunga-matahari-selalu-ikuti-arah-cahaya-matahari&psig=AOvVaw2LEtvUWUo68V-JG6Q76-Cp&ust=1681483855251000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCID6176Mp_4CFQAAAAAdAAAAABAE",
      createdAt: new Date(),
      updatedAt : new Date()
    }] );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Photos', null, {});
  }
};
