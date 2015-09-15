/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url is defined and not empty', function() {

            for(var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            console.log(allFeeds[i].url);
            expect(allFeeds[i].url).not.toBe(0);

           }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined and not empty', function() {

            for(var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name).not.toBe(0);

           }
        });
    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */


          describe('The menu', function() {


          var rect = $(".menu").get(0).getBoundingClientRect();


            it('ensures the menu element is hidden by default', function() {


                var left = rect.left;
                var right = rect.right;
                var bottom = rect.bottom;
                var top = rect.top;
                var screenheight = $(window).height();
                var screenwidth = $(window).width();
                if(right <= 0)
                    expect(right).not.toBeGreaterThan(0); // to the left of screen window
                else if(bottom <=0)
                    expect(bottom).not.toBeGreaterThan(0); // on top of screen window
                else if (left > screenwidth)
                     expect(left).not.toBeLessThan(screenwidth); // to the right of screen window
                else if (top > screenheight)
                     expect(top).not.toBeLessThan(screenheight); // below the screen window
                else
                    fail("menu is not hidden");

               // expect(rect.bottom).not.toBeGreaterThan(0);
               // var tr = $(".menu").css("transform").value;
            // console.log(tr);
                //".menu").css("transform").matrix
                //expect((".menu").css("transform").not.toBe(0);


          });

            it('ensures menu display when icon clicked and hides when clicked again', function() {
                var res1 = $('body').hasClass('.menu-hidden');
                expect(res1).not.toBe(true);
                $('.menu-icon-link').trigger('click');
                var res2 = $('body').hasClass('.menu');
                expect(res2).not.toBe(true);
             });


        });


    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        describe('Initial Entries', function() {
            beforeEach (function(done) {
                loadFeed(0,function() {
                    done();
                });
            });
            it ('ensure at least a single entry element is present withing the .feed', function(done) {
                var children = $('.feed').children();
                var count = children.length;
                expect(count).toBeGreaterThan(0);
                done();
            });

         });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         describe('New Feed Selection', function() {
            var children1;
            var children2;
            beforeEach (function(done) {
                loadFeed(0,function() {
                    children1 = $('.feed').children();
                    loadFeed(1,function() {
                        children2 = $('.feed').children();
                        done();
                    });

            });
            });

            it ('ensure feed results are different', function(done) {
                flag = false;
                for(i=0; i< children1.length; i++) {
                    c1 = children1.get(0);
                    for(i=0; i< children2.length; i++) {
                        c2 = children2.get(0);
                        if( c1.valueOf() !== c2.valueOf())
                            flag = true;
                    }
                    if(flag)
                        break;
                }
                expect(flag).toBe(true);
                done();
            });

         });

}());