import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tic = new Mongo.Collection('tic_tac_toe');

Meteor.methods({
  board_insert: function (board,PlayerId) {
	Tic.insert({
		"ax1": board[0], 
		"ax2": board[1], 
		"ax3": board[2],
		"bx1": board[3], 
		"bx2": board[4], 
		"bx3": board[5],
		"cx1": board[6], 
		"cx2": board[7], 
		"cx3": board[8],
		createdBy : PlayerId, 
		createdAt: Date.now()
	});
  },

  game_end_control: function(board){
  	for(i=0;i<9;i++){
  		if(board[i]=="")	
  			return 0;
  	}	
	return 1;
  },

  calculate: function(board){
  	if(board[0]==board[1]&&board[0]==board[2]&&board[0]!="")
  		return board[0];
  	else if(board[3]==board[4]&&board[3]==board[5]&&board[3]!="")
  		return board[3];
  	else if(board[6]==board[7]&&board[6]==board[8]&&board[6]!="")
  		return board[6];
  	else if(board[0]==board[3]&&board[0]==board[6]&&board[0]!="")
  		return board[0];
  	else if(board[1]==board[4]&&board[1]==board[7]&&board[1]!="")
  		return board[1];
  	else if(board[2]==board[5]&&board[2]==board[8]&&board[2]!="")
  		return board[2];
  	else if(board[0]==board[4]&&board[0]==board[8]&&board[0]!="")
  		return board[0];
  	else if(board[2]==board[4]&&board[2]==board[6]&&board[2]!="")
  		return board[2];
  	console.log(board);
  },

  'reset' : function(){
    Tic.remove({});
  }
  	
});



