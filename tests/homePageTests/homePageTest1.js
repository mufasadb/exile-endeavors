import { Selector } from 'testcafe';

fixture `Home Page Tests`
    .page `http://localhost:3001/`;

test('Check for main heading on the Home page', async t => {
    await t
        .expect(Selector('h1').innerText).eql('Welcome to Exile Endeavors!');
});
