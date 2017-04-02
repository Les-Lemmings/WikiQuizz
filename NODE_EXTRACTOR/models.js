var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://86.75.229.131:27017/blog', function(err) {
  if (err) { throw err; }
});

/*monCommentaire.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
});*/

var syntagmeSchema = new mongoose.Schema({
	_id: false,
	data: String,
	value: String,
	points: Number,
	sameAs: [ String ]
});

var questionSchema = new mongoose.Schema({
	qid : mongoose.Schema.ObjectId,
	titre : String,
	article : { type : String, unique: true, match: /^(https?:\/\/)?.*\/?$/ },
	categorie : String,
	validee: Boolean,
	image: [ { data: Buffer, contentType: String } ], // a.image.data = fs.readFileSync(imgPath); a.image.contentType = "image/png";
	date: { type : Date, default : Date.now },
	syntagmes: [ syntagmeSchema ]
});
questionSchema.plugin(random);

var SyntagmeModel = mongoose.model('syntagmes', syntagmeSchema);
var QuestionModel = mongoose.model('questions', questionSchema);


/**
 * @Param : q la question, s le tableau contenant les syntagmes
 */
module.exports.ajouterQuestion = function(q, s) {
	var question = new QuestionModel({});
	question.titre = q.titre;
	question.article = q.article;
	question.validee = false;
	question.categorie = q.categorie;

	var syntagmes = new SyntagmeModel();
	
	for (i in s) {
		question.syntagmes.push(i);
	}

	question.save(function(err) {
		if(err){
			console.log(err);
			throw err;
		}
		console.log('Success: Add Question');
	});
};

module.exports.trouverNonValidee = function(callback) {
	var query = QuestionModel.find({}, function(err, questions) {
		callback(questions);
	}).where('validee').equals(false);
}

module.exports.findRandomQuestion = function(number, categories, callback) {
	QuestionModel.count(function(err, count) {
		if(err) {
			return callback(err);
		}
		var rand = Math.floor(Math.random() * count);
		QuestionModel.find().where('categorie').in(categories).skip(rand).limit(number).exec(function(err, res) {
			callback(res);
		});
	})
}

//Vérifier que la réponse dans une boite de réponse correspond à un syntagme de la question ou sameAs

module.exports.findQuestionById = function(id, callback) {
	QuestionModel.findById(id, function(err, res) {
		callback(res);
	});
}

module.exports.findQuestionByUrl = function(url, callback) {
	QuestionModel.findOne({}, function(err, res) {
		callback(res);
	}).where("article").equals(url);
}

module.exports.findQuestionByCategorie = function(categorie, callback) {
	QuestionModel.findOne({}, function(err, res) {
		callback(res);
	}).where("categorie").equals(categorie);
}




/*==================================================================
============================ JOUEUR ================================
==================================================================*/

var partieSchema = new mongoose.Schema({
	_id: false,
	questions: [ String ],
	questionsRepondues: Number,
	points: Number,
});

var joueurSchema = new mongoose.Schema({
	qid : mongoose.Schema.ObjectId,
	ip: String,
	pseudo : String,
	firstConnection: { type : Date, default : Date.now },
	parties: [ partieSchema ]
});

var PartieModel = mongoose.model('parties', partieSchema);
var JoueurModel = mongoose.model('joueurs', joueurSchema);
