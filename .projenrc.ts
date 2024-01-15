import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.80.0',
  typescriptVersion: '5.1.x',
  jsiiVersion: '5.1.x',
  defaultReleaseBranch: 'main',
  name: '@gammarer/aws-waf-geo-restriction-rule-group',
  description: 'This is an AWS CDK Construct for Geo Restriction Rule Group on WAF V2',
  majorVersion: 1,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarer/aws-waf-geo-restriction-rule-group.git',
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '18.17.1',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 19 * * 1']), // every monday (JST/THU:02:00)
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
  publishToPypi: {
    distName: 'gammarer.aws-waf-geo-restriction-rule-group',
    module: 'gammarer.aws_waf_geo_restriction_rule_group',
  },
  publishToMaven: {
    mavenGroupId: 'com.gammarer',
    javaPackage: 'com.gammarer.cdk.aws.waf_geo_restriction_rule_group',
    mavenArtifactId: 'aws-waf-geo-restriction-rule-group',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: 'Gammarer.CDK.AWS',
    packageId: 'Gammarer.CDK.AWS.WafGeoRestrictionRuleGroup',
  },
});
project.synth();