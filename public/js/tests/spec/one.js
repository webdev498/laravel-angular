describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    var sorted = users.sort();
    expect(sorted).toEqual(['igor', 'jack', 'jeff']);
  });
});
