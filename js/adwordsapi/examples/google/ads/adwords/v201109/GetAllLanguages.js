// Copyright 2011, Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @author api.davidtorres@gmail.com (David Torres)
 */

/**
 * @fileoverview Defines GetAllLanguages, a code example that retrieves all
 * languages available for targeting.
 */

goog.provide('google.ads.adwords.examples.v201109.GetAllLanguages');

goog.require('google.ads.adwords.AdWordsService.v201109');
goog.require('google.ads.adwords.examples.ExampleBase');
goog.require('google.ads.adwords.v201109.ConstantDataService');

/**
 * This example illustrates how to retrieve all languages available for
 * targeting.
 *
 * Tags: ConstantDataService.getLanguageCriterion
 *
 * @extends google.ads.adwords.examples.ExampleBase
 * @constructor
 */
google.ads.adwords.examples.v201109.GetAllLanguages = function() {
  google.ads.adwords.examples.ExampleBase.call(this);
  this.description = 'This example illustrates how to retrieve all carriers ' +
      'available for targeting.';
};
goog.inherits(google.ads.adwords.examples.v201109.GetAllLanguages,
    google.ads.adwords.examples.ExampleBase);

/**
 * Runs the code example.
 *
 * @param {google.ads.adwords.AdWordsUser} user AdWords user running the code
 *     example.
 * @param {function} callback the callback method to be called once this example
 *     is complete.
 */
google.ads.adwords.examples.v201109.GetAllLanguages.prototype.run =
    function(user, callback) {
  // Get the ConstantDataService.
  var constantDataService = user.getService(
      google.ads.adwords.AdWordsService.v201109.ConstantDataService);

  try {
    constantDataService.getLanguageCriterion(
      goog.bind(function(languages) {
        for (var i = 0; i < languages.length; i++) {
          var language = languages[i];
          this.writeOutput('Language name is "%s", ID is %s and code ' +
              'is "%s".', language.name, language.id, language.code);
        }
        callback();
      }, this),
      goog.bind(function(soapException) {
        this.writeOutput('Failed to get languages. Soap Fault says "%s"',
            soapException.getInnerException().getFaultString());
        callback();
      }, this)
    );
  } catch (ex) {
    this.writeOutput('An exception occurred while running the code example.');
    callback();
  }
};
