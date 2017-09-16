describe("functional testing", function() {
  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});
describe("skynet functional testing", function() {
  let skynet;
  beforeEach(()=>{
  	const data = skynet.random.randn()
  	skynet.data(data)
  		.batching()
  		.layers('l1')
  			.enter()
  			.sampling()
  		.layers('l2')
  			.enter()
  			.size([10,20])
  			.sampling()
  		.train().epoch(100)
  	skynet.run()
  	skynet.predict()
  })
  it("skye", function() {
    
  });
});