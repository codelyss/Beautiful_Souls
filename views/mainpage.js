'use strict';

const e = React.createElement;

class MainPage extends React.Component {
    render() {
        var inboxLink = e('a', {class: 'btn btn-primary btn-lg mt-4', href:'/inbox', role:'button'}, 'Mailbox');
        var viewLink = e('a', {class: 'btn btn-primary btn-lg mt-4 btnpadding', href:'/view', role:'button'}, 'View other Letters');
        var createLink = e('a', {class: 'btn btn-primary btn-lg mt-4', href:'/create', role:'button'}, 'Write a Letter');
        var logoutlink = e('a', {class: 'btn btn-primary btn-lg mt-4 btnpadding', href: '/logout', role:'button'}, 'Logout');
        var subtitle = e('h4', {class: 'mt-4'}, 'Create and share letters with others!');
        var title = e('h1', {class: 'display-4'}, 'Beautiful Souls 📝');
        var subcontainer = e('div', {class: 'jumbotron text-center margintop'}, [title, subtitle, createLink, viewLink, inboxLink, logoutlink]);
        var topcontainer = e('div', {class: 'container'}, subcontainer);
        return topcontainer;
    }
  }
  
  ReactDOM.render(
    React.createElement(MainPage, null, null),
    document.getElementById('mainContainer')
  );