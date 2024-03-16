
# Powercut

Recently in Zambia, we've experienced load shedding, currently at stage 1, resulting in 8 hours per day without electricity across various areas. It can be challenging to anticipate these power outages, making it difficult to plan ahead for activities such as ironing your clothes. This project is designed to provide clear visibility into the load shedding schedule, helping you understand and plan for these outages more easily.

## Demo

[powercut.app](powercut.app)

## How does it work

The tricky part of getting this to work was cleaning the data from zesco and making sure it is in a good shape to work with. 
So we get data from the pdf extract areas and schedules, clean it with different tools and make sure it is proper JSON. For better user experience we make it easy for users to find areas that are supported by offering them autocompletion, After we get the user's area we find the group they are in within a specific province and then we find the schedule for that Group and then we show all upcoming schedule for that Group.  

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Installation

Steps to install your project.

```bash
git clone https://github.com/olivierjm/powercut.git
cd powercut
yarn
yarn run dev
```


## Features

- Shows upcoming schedule for an area
- Supports Lusaka, Copperbelt & North Western Province
- Works offline
- Installable on devices

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Note: Make sure all tests are passing and if you add new change add accompanying tests. (`yarn test`)

## Code of Conduct

Please adhere to this project's [code of conduct](CODE_OF_CONDUCT.md).

## License

Distributed under the MIT License. See [License](LICENSE.md) for more information.

## Contact

OlivierJM - manolivier93@gmail.com

## Acknowledgments

- Thanks to Zesco for making the schedule public

