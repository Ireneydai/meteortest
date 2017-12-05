import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('items', function() {
    return Items.find({

    });
  });
}

Meteor.methods({
  'items.insert'(text, description) {

    Items.insert({
      text: text,
      description: description,
      createdAt: new Date(),
      image: 'https://cnet1.cbsistatic.com/img/M28Coys2pFCZJf5JA4rOrfEKxr8=/fit-in/970x0/2017/10/31/a22348c2-6d9b-4c45-9b4d-e5e2d1ce0344/iphone-x-comparisons-01.jpg',
    });
  },

  'items.find'(string){
    Items.find({}, {sort:{text:string}});
  },

  'items.remove'(itemId) {

    Items.remove(itemId);
  },


});
