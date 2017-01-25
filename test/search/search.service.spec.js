describe('Unit: Service Test', function () {

    beforeEach(module("AppModule"));

    beforeEach(inject(function (SearchFactory, _$httpBackend_) {
        service = SearchFactory;
        $httpBackend = _$httpBackend_; // angular strips the underscores so
    }));

    describe('PatientsSummaryService: getActivities', function () {

        it('should invoke GET service', function () {
            var mockData = {
                "data": [{
                    "id": 1,
                    "name": "Poland",
                    "isoCode": "POL"
                }]
            };
            service.search("pol");

            $httpBackend.whenGET("http://localhost:3000/country?name_like=pol").respond(mockData);


            function callback(data) {
                expect(data.data).not.toBeNull();
            };

            function error(data) {};


            $httpBackend.flush();

        });

    });
});