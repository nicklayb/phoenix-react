# phoenix-react


The package offers state support for [Phoenix Channels](https://hexdocs.pm/phoenix/channels.html) using the [React's Context API](https://reactjs.org/docs/context.html). The only external dependency is [Phoenix js](https://hexdocs.pm/phoenix/js/).

It provides :
- Central state for your events
- Simple channel and events registration using Consumer
- HOC for easy coupling with the Provider

## Running the example

- Clone the repository

```
git clone https://github.com/nicklayb/phoenix-react
```

- Install npm packages

```
npm install
//  or
yarn install
```

- Run development environment

```
npm run dev
```

## Introducing v. 1.0.0 🎉

### Complete rewrite

After having to use this package in production within a real case app, I found some difficulties using the [0.1.0](https://github.com/nicklayb/phoenix-react/tree/0.1.0) version. Some things were not optimized and had a lot of overhead.

I decided to do a complete rewrite in a 1.0.0 version. Of course, **there are breaking changes**. If you intend to update from 0.1.0 to 1.\*.\*, I suggest to forget about it now and start thinking about replacing 0.1.0 to 1.\*.\* if you wish to. As I gain some maturity using React's context api, I decided to use a better Provider/Consumer approach. I hope it'll serve your needs.

If you are having issues using [0.1.0](https://github.com/nicklayb/phoenix-react/tree/0.1.0), don't hesitate to submit issues using 0.1 tag and I'll do my best to help you.

## Getting started

### Install the dependency

Using npm
```sh
npm install --save phoenix-react
```

Using yarn
```sh
yarn add phoenix-react
```

### Setting up the context Provider

```jsx

```

### Registering a topic

```jsx

```

### Handling events

```jsx

```
