const license = require('./licenses.js')

// Markdown Generator function
const generateMarkdown = (data, gitData) => {

  // Link to license based on user input
  const licenseLink = license(data.license)

  let avatarURL = gitData.data.avatar_url
  let name = gitData.data.name
  //****************
  // README TEMPLATE
  //****************
  const markdown = `
# ${data.readmeT}
 ${licenseLink[1]}
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)
## Installation
${data.usage} 
## Contributing
${data.contributing}
## Tests
${data.test}
## Questions
![Profile Image](${avatarURL})
* Contact: ${name}
* FAQ: ${data.questions}
## License
Licensed under the [${data.license}](${licenseLink[0]}) license.
`
  return markdown
}

module.exports = generateMarkdown