import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as waf from 'aws-cdk-lib/aws-wafv2';
import { Scope, WafGeoRestrictRuleGroup } from '../src';

describe('Web ACL Rule Group default testing', () => {

  describe('Web Acl Rule Group scope=global testing', () => {

    const app = new App();
    const stack = new Stack(app, 'TestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    const ruleGroup = new WafGeoRestrictRuleGroup(stack, 'WafGeoRestrictRuleGroup', {
      scope: Scope.GLOBAL,
      allowCountries: ['JP'],
    });

    it('Is Waf RuleGroup', () => {
      expect(ruleGroup).toBeInstanceOf(waf.CfnRuleGroup);
    });

    const template = Template.fromStack(stack);

    it('Should have WAF Rule Group', () => {
      template.hasResourceProperties('AWS::WAFv2::RuleGroup', Match.objectEquals({
        Description: 'geo restrict rule group',
        Scope: 'CLOUDFRONT',
        Capacity: 10,
        CustomResponseBodies: {
          'geo-restrict': {
            Content: 'Sorry, You Are Not Allowed to Access This Service.',
            ContentType: 'TEXT_PLAIN',
          },
        },
        Rules: Match.arrayWith([
          {
            Priority: 0,
            Name: 'allow-geo-rule',
            Action: {
              Allow: {},
            },
            VisibilityConfig: {
              CloudWatchMetricsEnabled: true,
              MetricName: 'AllowGeoRule',
              SampledRequestsEnabled: true,
            },
            Statement: {
              GeoMatchStatement: {
                CountryCodes: ['JP'],
              },
            },
          },
          {
            Priority: 1,
            Name: 'deny-geo-rule',
            Action: {
              Block: {
                CustomResponse: {
                  CustomResponseBodyKey: 'geo-restrict',
                  ResponseCode: 403,
                },
              },
            },
            VisibilityConfig: {
              CloudWatchMetricsEnabled: true,
              MetricName: 'DenyGeoRule',
              SampledRequestsEnabled: true,
            },
            Statement: {
              NotStatement: {
                Statement: {
                  GeoMatchStatement: {
                    CountryCodes: ['JP'],
                  },
                },
              },
            },
          },
        ]),
        VisibilityConfig: {
          CloudWatchMetricsEnabled: true,
          MetricName: 'GeoRestrictRule',
          SampledRequestsEnabled: true,
        },
      }));
    });

    it('Should match snapshot', () => {
      expect(template.toJSON()).toMatchSnapshot('global');
    });

  });

  describe('Web Acl Rule Group scope=regional testing', () => {

    const app = new App();
    const stack = new Stack(app, 'TestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    const ruleGroup = new WafGeoRestrictRuleGroup(stack, 'WafGeoRestrictRuleGroup', {
      name: 'example-waf-geo-restrict-rule-group',
      scope: Scope.REGIONAL,
      allowCountries: ['JP'],
    });

    it('Is Waf RuleGroup', () => {
      expect(ruleGroup).toBeInstanceOf(waf.CfnRuleGroup);
    });

    const template = Template.fromStack(stack);

    it('Should have WAF Rule Group', () => {
      template.hasResourceProperties('AWS::WAFv2::RuleGroup', Match.objectEquals({
        Name: 'example-waf-geo-restrict-rule-group',
        Description: 'geo restrict rule group',
        Scope: 'REGIONAL',
        Capacity: 10,
        CustomResponseBodies: {
          'geo-restrict': {
            Content: 'Sorry, You Are Not Allowed to Access This Service.',
            ContentType: 'TEXT_PLAIN',
          },
        },
        Rules: Match.arrayWith([
          {
            Priority: 0,
            Name: 'allow-geo-rule',
            Action: {
              Allow: {},
            },
            VisibilityConfig: {
              CloudWatchMetricsEnabled: true,
              MetricName: 'AllowGeoRule',
              SampledRequestsEnabled: true,
            },
            Statement: {
              GeoMatchStatement: {
                CountryCodes: ['JP'],
              },
            },
          },
          {
            Priority: 1,
            Name: 'deny-geo-rule',
            Action: {
              Block: {
                CustomResponse: {
                  CustomResponseBodyKey: 'geo-restrict',
                  ResponseCode: 403,
                },
              },
            },
            VisibilityConfig: {
              CloudWatchMetricsEnabled: true,
              MetricName: 'DenyGeoRule',
              SampledRequestsEnabled: true,
            },
            Statement: {
              NotStatement: {
                Statement: {
                  GeoMatchStatement: {
                    CountryCodes: ['JP'],
                  },
                },
              },
            },
          },
        ]),
        VisibilityConfig: {
          CloudWatchMetricsEnabled: true,
          MetricName: 'GeoRestrictRule',
          SampledRequestsEnabled: true,
        },
      }));
    });

    it('Should match snapshot', () => {
      expect(template.toJSON()).toMatchSnapshot('regional');
    });

  });

});