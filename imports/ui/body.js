import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';

import { Tic } from '../api/game.js';
import './body.html'


Template.tic_tac_toe.helpers({
	'result' : function(){
		last_turn = Session.get('last_turn');
		result = Session.get('result');
		if(result=="draw"){
			return '<br>'+result+'<br><input type="button" value="Reset" class="reset"/>';
		}
		else if(result){
			return '<br>'+result+' wins <br><input type="button" value="Reset" class="reset"/>';
		}
		else{
			if(last_turn){
				if(last_turn.createdBy==Meteor.userId())
					return '<input type="submit" value="Hamle"/>'
							+'<br><br><br><br>Hamle Yaptınız , Sıra diğer oyuncuda // TEST İÇİN AKTİF ';
				else
					return '<input type="submit value="Hamle"/>';
			}
			else
				return '<input type="submit" value="Hamle"/>'; //ilk hamle	
		}
	},
	'board' : function(){
		var board = Tic.findOne({}, {sort: {createdAt: -1}});
		return board;
	}
});


Template.tic_tac_toe.events({
	'submit .game' : function(event,template){
		event.preventDefault();
		PlayerId = Meteor.userId();	
		object = template.findAll('.per');
		const board = [
			object[0].value, 
			object[1].value, 
			object[2].value,
			object[3].value, 
			object[4].value, 
			object[5].value,
			object[6].value, 
			object[7].value, 
			object[8].value,
		];
		console.log(board);
		Meteor.call('board_insert',board,PlayerId);
		var last_turn = Tic.findOne({}, {sort: {createdAt: -1}});
		Session.set('last_turn',last_turn);
		Meteor.call('game_end_control',board, function(error, result){
			if(result==0){
					Meteor.call('calculate',board, function(error, result){
						if(result){
							Session.set('result',result);
						}
					});
			}
			else{
					Meteor.call('calculate',board, function(error, result){
						if(result){
							Session.set('result',result);
						}
						else{
							Session.set('result',"draw");
						}
					});
			}
		});
	},

	'click .reset' : function(){
		event.preventDefault();
		Session.set('result', undefined);
		Session.set('last_turn', undefined);
		Meteor.call('reset');
	}
});
