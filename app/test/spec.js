describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8100');

    // expect(browser.getTitle()).toEqual('');

    // var h2 = element(by.tagName('h2'));

    // expect(h2.getText()).toEqual('Agile 2016');

    var titlePromise = browser.getTitle();
     titlePromise.then(function(text){
     console.log("3**************", text);
   });
  });
});