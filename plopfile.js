module.exports = function (plop) {
  plop.setWelcomeMessage('Vui lòng chọn tính năng');
  plop.getGeneratorList();
  plop.setGenerator('font', {
    description: 'Thêm font chữ',
    prompts: [
      {
        type: 'input',
        name: 'namefile',
        message: 'Tên của font-face(chữ thường , liền nhau)'
      }
    ],
    actions: [
      {
        type: 'append',
        path: 'assets/scss/setting/fonts.scss',
        pattern: `/* FONT_FACE */`,
        template: `'{{namefile}}',`
      }
    ]
  });
  plop.setGenerator('checkDevices', {
    description: 'check trình duyệt',
    prompts: [
      {
        type: 'input',
        name: 'link_androi',
        message: 'Tên link Androi',
        defalut: '{{config.androi_store}}'
      },
      {
        type: 'input',
        name: 'link_ios',
        message: 'Tên link IOS',
        defalut: '{{config.apple_store}}'
      },
      {
        type: 'input',
        name: 'name-button',
        message: 'tên nút cần check'
      }
    ],
    actions: [
      {
        type: 'append',
        templateFile: 'templates/js/checkDevices.hbs',
        pattern: `/* customJS */`,
        path: 'assets/js/app.js'
      }
    ]
  });
  plop.setGenerator('JS-[createSwipper]', {
    description: 'Tạo Swipper',
    prompts: [
      {
        type: 'input',
        name: 'name_slick',
        message: 'Tên Slick'
      }
    ],
    actions: [
      {
        type: 'append',
        templateFile: 'templates/js/createSwipper.hbs',
        pattern: `/* customJS */`,
        path: 'assets/js/app.js'
      }
    ]
  });
  plop.setGenerator('newKit', {
    description: 'Tạo một Kit mới',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tên của Kit:',
        default: 'Test1'
      },
      {
        type: 'input',
        name: 'route',
        message: 'Đường dẫn muốn lưu này ( Ví dụ : components/menu):'
      },

      {
        type: 'confirm',
        name: 'ask',
        message: 'Bạn có muốn import vào kit?',
        abortOnFail: true,
        default: false
      },
      {
        type: 'input',
        name: 'import',
        message: 'Vị trí muốn import ( ví dụ : layouts/_scrollbar)'
      }
    ],
    actions: function (data) {
      var actions = [];

      if (data.ask) {
        actions.push(
          {
            type: 'add',
            path: 'kit/{{route}}/_{{name}}.kit',
            templateFile: 'templates/html/[html]newKit.hbs'
          },
          {
            type: 'add',
            path: 'assets/scss/{{route}}/_{{name}}.scss',
            templateFile: 'templates/css/[css]newKit.hbs'
          },
          {
            type: 'append',
            path: 'assets/scss/main.scss',
            pattern: `/* PLOP_COMPONENTS_IMPORT */`,
            template: `@import '{{route}}/{{name}}';`
          },
          {
            type: 'append',
            path: 'kit/{{import}}.kit',
            pattern: `<!-- PLOP_KIT_IMPORT -->`,
            template: `<!-- @import {{route}}/{{name}} -->`
          }
        );
      } else {
        actions.push(
          {
            type: 'add',
            path: 'kit/{{route}}/_{{name}}.kit',
            templateFile: 'templates/html/[html]newKit.hbs'
          },
          {
            type: 'add',
            path: 'assets/scss/{{route}}/_{{name}}.scss',
            templateFile: 'templates/css/[css]newKit.hbs'
          },
          {
            type: 'append',
            path: 'assets/scss/main.scss',
            pattern: `/* PLOP_COMPONENTS_IMPORT */`,
            template: `@import '{{route}}/{{name}}';`
          }
        );
      }

      return actions;
    }
  });
  plop.setGenerator('newPage', {
    description: 'Tạo một Page mới',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tên của Page:'
      },
      {
        type: 'input',
        name: 'route',
        message: 'Đường dẫn muốn lưu này ( Ví dụ : components/menu):'
      },
      {
        type: 'confirm',
        name: 'ask',
        message: 'Bạn muốn tạo layout mới không ?',
        abortOnFail: true,
        default: false
      },
      {
        type: 'input',
        name: 'import',
        message: 'Tên layouts sử dựng',
        default: 'default__layout'
      }
    ],
    actions: function (data) {
      var actions = [];

      if (data.ask) {
        actions.push(
          {
            type: 'add',
            path: 'assets/scss/layouts/_{{import}}.scss',
            templateFile: 'templates/css/layout.hbs'
          },
          {
            type: 'append',
            path: 'assets/scss/main.scss',
            pattern: `/* PLOP_LAYOUTS_IMPORT */`,
            template: `@import 'layouts/_{{import}}.scss';`
          }
        );
      }
      actions.push(
        {
          type: 'add',
          path: 'kit/{{name}}.kit',
          templateFile: 'templates/html/newPage.hbs'
        },
        //Tạo file kit nhỏ
        {
          type: 'add',
          path: 'kit/{{route}}/_frame1.kit'
        },
        //Tạo file scss
        {
          type: 'add',
          path: 'assets/scss/{{route}}/_{{name}}.scss',
          templateFile: 'templates/css/[css]newPage.hbs'
        },
        //Import scss
        {
          type: 'append',
          path: 'assets/scss/main.scss',
          pattern: `/* PLOP_COMPONENTS_IMPORT */`,
          template: `@import '{{route}}/{{name}}';`
        }
      );

      return actions;
    }
  });
};
