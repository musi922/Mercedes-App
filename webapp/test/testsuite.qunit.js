sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: mercedsapp",
		defaults: {
			page: "ui5://test-resources/mercedsapp/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "mercedsapp/",
				never: "test-resources/mercedsapp/"
			},
			loader: {
				paths: {
					"mercedsapp": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for mercedsapp"
			},
			"integration/opaTests": {
				title: "Integration tests for mercedsapp"
			}
		}
	};
});
