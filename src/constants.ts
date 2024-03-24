export const issues="https://github.com/OlivierJM/powercut/issues"
export const powercut="https://github.com/OlivierJM/powercut"
export const questions = [
  {
    question: 'Why can I not see my location?',
    answer:
      "Currently we only support a few locations, which include Lusaka, Copperbelt and North Western Province, We're working on adding more.",
    value: 'my-location',
  },
  {
    question: 'I still cant see my location in the areas mentioned above',
    answer: 'If you can not see exactly your area, search for a place or landmark near you ',
    value: 'my-other-location',
  },
  {
    question: 'Load shedding schedule for my area is not accurate',
    answer:
      'Kindly note that load shedding schedule is managed by zesco and we only display the schedule as is. In the future we will add a adding a feature to report inaccurate schedules.',
    value: 'wrong-schedule',
  },
  {
    question: 'App shows load shedding is happening but there is power',
    answer:
      'Load shedding does not take effect exactly at the top of the hour, it can take a few minutes to an hour before it starts or ends',
    value: 'missing-time',
  },
  {
    question: 'Is this app owned by Zesco?',
    answer:
      "No it is not, this app is a third party app that uses Zesco's load shedding schedule to display the schedule in a user friendly way",
    value: 'reset',
  },
  {
    question: 'How can I contribute?',
    answer: `The app is opensource, and you can add your own contribution on the following  ${powercut}`,
    value: 'contribute',
  },
  {
    question: 'How can I report a bug?',
    answer:
      `You can report a bug by sending an email to manolivier93@gmail.com, or on Github issues ${issues}`,
    value: 'report-bug',
  },
  {
    question: 'Do you collect any data',
    answer: 'No this app does not collect any data at all',
    value: 'collect-data',
  },
  {
    question: 'Can this app work if I dont have internet',
    answer:
      '100%, You can still access this app while offline, Infact you can try it by turning off your internet and refreshing the page.',
    value: 'offline',
  },
];
