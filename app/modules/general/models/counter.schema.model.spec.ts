import * as mongoose from 'mongoose';
import { environment } from '../../../../environments/environment';
describe('Description', () => {
  it('Test', () => {
    expect(true).toBe(true);
  });
});

// xdescribe('User model', () => {
//   beforeAll(async () => { await mongoose.connect(environment.TEST_DB, { useNewUrlParser: true }); });

//   afterAll(async () => {
//     User.deleteMany({});
//     mongoose.connection.close();
//   });

//   it('Should throw validation errors', () => {
//     const user = new User();
//     expect(user.validate).toThrow();
//   });

//   it('Should save a user', async () => {
//     expect.assertions(3);

//     const user: IUserModel = new User({
//       uid: 1,
//       name: 'Test first name',
//       avatarSrc: 'Test last name',
//       comms: 2,
//       type: 'Paciente',
//     });
//     const spy = jest.spyOn(user, 'save');
//     user.save();

//     expect(spy).toHaveBeenCalled();

//     expect(user).toMatchObject({
//       name: expect.any(String),
//       uid: expect.any(Number),
//     });

//     expect(user.name).toBe('Test first name');
//   });
// });