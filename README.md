# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## API Configuration

This application uses an API Gateway backend for contact form submissions. To configure the API endpoint:

1. Deploy the CloudFormation template located in `infra/template.yaml`:
   ```bash
   aws cloudformation create-stack \
     --stack-name mxintech-contact-api \
     --template-body file://infra/template.yaml \
     --parameters \
       ParameterKey=SesIdentityArn,ParameterValue=arn:aws:ses:region:account:identity/your-domain \
       ParameterKey=ApiDomainName,ParameterValue=mxintech.org \
       ParameterKey=HostedZoneId,ParameterValue=Z1234567890ABC
   ```

2. After deployment, get the API endpoint from CloudFormation outputs:
   ```bash
   aws cloudformation describe-stacks \
     --stack-name mxintech-contact-api \
     --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
     --output text
   ```

3. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your API endpoint:
   ```
   REACT_APP_API_ENDPOINT=https://your-api-id.execute-api.region.amazonaws.com/prod
   ```
   Or if using custom domain:
   ```
   REACT_APP_API_ENDPOINT=https://api.mxintech.org
   ```

5. Restart the development server for changes to take effect.

## Contact Forms

The application includes 4 different contact forms:
- **Member** (`/contact/member`): Join the community and receive event notifications
- **Leader** (`/contact/leader`): Become a community leader and organize events
- **Speaker** (`/contact/speaker`): Share knowledge through talks and workshops
- **Business** (`/contact/business`): Sponsor the community or establish business relations

All forms submit to the same API Gateway endpoint with a `contactType` field to differentiate submission types.
