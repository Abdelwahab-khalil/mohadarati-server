//mohadaratiController.js
// //Import mohadarati Model
Mohadarati = require('./model');
var uuid = require('uuid');

var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
//For index
exports.index = async function (req, res) {
    const mohadarati = await db.collection('mohadarati').get()
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        data.push(doc.data())
    });
    res.send(data)
};

exports.admis = async function (req, res) {
    const mohadarati = await db.collection('mohadarati').where('admis', '==', true).get()
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        data.push(doc.data())
    });
    res.send(data)
};

exports.prof = async function (req, res) {
    const prof = req.body.prof;
    const mohadarati = await db.collection('mohadarati').where('admis', '==', true).get()
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        if(doc.data()['prof'] == prof)
        data.push(doc.data())
    });
    if(data.empty) res.send('Pas de mohadarati')
    res.send(data)
};

exports.after = async function (req, res) {
    const now = new Date();
    const date = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+now.getDate().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const mohadarati = await db.collection('mohadarati').where('date', '>', date).get();
    
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        if(doc.data()['admis'] == true)
        data.push(doc.data())
    });
    res.send(data)
};

exports.befor = async function (req, res) {
    const now = new Date();
    const date = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+now.getDate().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const mohadarati = await db.collection('mohadarati').where('date', '<', date).get();
    
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        if(doc.data()['admis'] == true)
        data.push(doc.data())
    });
    res.send(data)
};

exports.day = async function (req, res) {
    const now = new Date();
    const dateNow = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+now.getDate().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const date = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+(now.getDate()+1).toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const mohadarati = await db.collection('mohadarati').where('admis', '==', true).get();
    
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        if(doc.data()['date'] >= dateNow && doc.data()['date'] < date)
        data.push(doc.data())
    });
    if(data.empty) res.send('Pas de mohadarati')
    res.send(data)
};

exports.week = async function (req, res) {
    const now = new Date();
    const dateNow = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+now.getDate().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const date = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+(now.getDate()+7).toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const mohadarati = await db.collection('mohadarati').where('admis', '==', true).get();
    
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        if(doc.data()['date'] >= dateNow && doc.data()['date'] < date)
        data.push(doc.data())
    });
    if(data.empty) res.send('Pas de mohadarati')
    res.send(data)
};

exports.month = async function (req, res) {
    const now = new Date();
    const dateNow = now.getFullYear().toString()+'-'+(now.getMonth()+1).toString()+'-'+now.getDate().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const date = now.getFullYear().toString()+'-'+(now.getMonth()+2).toString()+'-'+now.getDate().toString()+'-'+now.getHours().toString()+'-'+now.getMinutes().toString()
    const mohadarati = await db.collection('mohadarati').where('admis', '==', true).get();
    
    if(mohadarati.empty) res.send('Pas de mohadarati')
    var data = [];
    mohadarati.forEach((doc) => {
        if(doc.data()['date'] >= dateNow && doc.data()['date'] <= date)
        data.push(doc.data())
    });
    if(data.empty) res.send('Pas de mohadarati')
    res.send(data)
};
//For creating new mohadarati
exports.add = async function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const prof = req.body.prof;
    const cat = req.body.cat;
    const picture = req.body.picture;
    const lien = req.body.lien;
    const date = req.body.date;
    const id = uuid.v1();
    const docRef = db.collection('mohadarati').doc(id);
    const data = {
        id: id,
        title : title,
        description : description,
        prof: prof,
        cat : cat,
        picture: picture,
        lien:lien,
        date:date,
        admis:false
    }
    await docRef.set(data);
    res.json({
        message: 'mohadarati Details',
        data: data
    });
};
// View mohadarati
exports.view = async function (req, res) {
    const mohadarati = await db.collection('mohadarati').doc(req.params.mohadarati_id).get()
    if (!mohadarati.exists) {
        res.send('No such document!');
    } else {
        res.send(mohadarati.data());
    }
    
};
// Update mohadarati
exports.update = async function (req, res) {
    const mohadarati = db.collection('mohadarati').doc(req.params.mohadarati_id);
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const prof = req.body.prof;
    const cat = req.body.cat;
    const picture = req.body.picture;
    const lien = req.body.lien;
    const date = req.body.date;
    const admis = req.body.admis;
    const data = {
        id: id,
        title : title,
        description : description,
        prof: prof,
        cat : cat,
        picture: picture,
        lien:lien,
        date:date,
        admis:admis,
    }
    await mohadarati.update(data)
    res.send(data)
};
// Delete mohadarati
exports.delete = async function (req, res) {
    const mohadarati = db.collection('mohadarati').doc(req.params.mohadarati_id);
    await mohadarati.delete()
    res.send('mohadarati deleted')
}