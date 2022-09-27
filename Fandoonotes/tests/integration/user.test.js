import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let Token;
let NewToken;
let noteId;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  //USER Registration with valid details
  describe('POST /registration', () => {
    it('given new user when added should return status 201', (done) => {
      const userdetails = {
        FirstName: 'prasanna',
        LastName: 'lakshmi',
        EmailId: 'prasannalakshmikathi@gmail.com',
        Password: 'arjun@1466'
      };
      request(app)
        .post('/api/v1/users/')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });

    //USER Registration with invalid details
    it('given new user when added should return status 400', (done) => {
      const userdetails = {
        FirstName: 123,
        LastName: '12',
        EmailId: 'rk@.com',
        Password: 'Rk123'
      };
      request(app)
        .post('/api/v1/users')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });

  //User Login with valid login details
  describe('POST /login', () => {
    it('given new user when added should return status 200', (done) => {
      const userdetails = {
        EmailId: 'prasannalakshmikathi@gmail.com',
        Password: 'arjun@1466'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          Token = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

  //Forget Password
  describe('POST /forgotpassward', () => {
    it('Given user mailId should check details and send mail with reset link', (done) => {
      const userdetails = {
        EmailId: 'prasannalakshmikathi@gmail.com'
      };
      request(app)
        .post('/api/v1/users/forgotpassward')
        .send(userdetails)
        .end((err, res) => {
          NewToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


  //reset Password
  describe('PUT /resetPassword', () => {
    it('Given user password should check details and send reset password successfully', (done) => {
      const userdetails = {
        Password: 'arjun@1466'
      };
      request(app)
        .put(`/api/v1/users/resetPassword/${NewToken}`)
        .send(userdetails)
        //.set('authorization', `bearer ${NewToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


  //Create New Note
  describe('POST /CreateNote', () => {
    it('Given new note details should be saved', (done) => {
      const userdetails = {
        Title: 'Rose',
        Descreption: 'A red rose is vey nice'
      };
      request(app)
        .post('/api/v1/note')
        .send(userdetails)
        .set('authorization', `bearer ${Token}`)
        .end((err, res) => {
          noteId = res.body.data._id;
          console.log("$$$$$$$$$..NoteId--------> ", noteId)
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  //Get All notes for a User
  describe('GET /note', () => {
    it('Given user login details should fetch all notes', (done) => {
      request(app)
        .get('/api/v1/note')
        .set('authorization', `bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  //Get a note by Id for a User
  describe('GET /note', () => {
    it('Given user login details should fetch all notes', (done) => {
      request(app)
        .get(`/api/v1/note/${noteId}`)
        .set('authorization', `bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });



  //Update a Note
  describe('PUT /updateNote', () => {
    it('given note id of a user should update the note', (done) => {
      const userdetails = {
        Title: 'Rose',
        Descreption: 'A red rose is vey nice'
      };
      request(app)
        .put(`/api/v1/note/${noteId}`)
        .send(userdetails)
        .set('authorization', `bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

  //Delete a Note
  describe('Delete /deleteNote', () => {
    it('given note id of a user should delete the note', (done) => {
      const userdetails = {
        Descreption: 'A red rose is vey nice'
      };
      request(app)
        .delete(`/api/v1/note/${noteId}`)
        .send(userdetails)
        .set('authorization', `bearer ${Token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


});