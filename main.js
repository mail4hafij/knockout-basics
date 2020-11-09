$(function () {

    // Parent class 
    // This is just to show how to write a class funciton in javascript
    // and how inhertiance works.
    function User(firstName, lastName, email) {
      this.email = email;
      // Observable properties
      this.firstName = ko.observable(firstName);
      this.lastName = ko.observable(lastName);
      this.online = ko.observable(false);

      // Computed
      this.fullName = ko.computed(() => {
        return this.firstName() + " " + this.lastName();
      }, this);
    }

    // Method
    User.prototype.login = function () {
      this.online(true);
    }

    // Method
    User.prototype.logout = function () {
      this.online(false);
    }




    // Child/Specialized Class
    function Admin(...args) {
      // Parent constructor
      User.apply(this, [args[0], args[1], args[2]]);

      this.todoList = ko.observableArray(['bring peace to the world!']);
    }

    // Extra step to inherite user prototype
    Admin.prototype = Object.create(User.prototype);

    // Method
    Admin.prototype.addTodoItem = function (todo) {
      if (todo) this.todoList.push(todo);
    }



    // Knockout Mapping example.
    const jsObject = { firstName: "Vladimir", lastName: "Putin", email: "valdmin.putin.russia.bear" };
    const koModel = ko.mapping.fromJS(jsObject);
    const firstName = koModel.firstName();
    const lastName = koModel.lastName();
    const email = koModel.email();



    // Component example
    ko.components.register('edit-todo-list-component', {
      viewModel: function (params) {
        // getting the knockout objects
        this.online = params.online;
        this.todoList = params.todoList;

        // Computed
        this.show = ko.computed(function () { return this.online() && this.todoList().length > 0; }, this);
        // Behaviors
        this.removeAll = function () { this.todoList.removeAll(); }.bind(this);
        // This also works
        this.test = function () { this.todoList.removeAll(); }
      },
      template:
        '<div>\
          <ul data-bind="foreach: todoList">\
            <li data-bind="text: $data"></li>\
          </ul>\
          <button data-bind="click: removeAll">Remove All</button>\
        </div>\
        '
    });


    // Creating Admin user.
    var admin = new Admin(firstName, lastName, email);
    // Creating ViewModel - knockout binding.
    ko.applyBindings(admin);


  });