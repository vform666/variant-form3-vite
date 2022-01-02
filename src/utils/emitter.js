
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    let name = child.$options.componentName;

    if (name === componentName) {
      //child.$emit.apply(child, [eventName].concat(params));
      if (!!child.emit$) {
        child.emit$.call(child, eventName, params)
      }
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  data() {
    return {
      vfEvents: {}
    }
  },

  methods: {
    emit$(eventName, data) {
      if (this.vfEvents[eventName]) {
        this.vfEvents[eventName].forEach((fn) => {
          fn(data);
        });
      }
    },

    on$(eventName, fn) {
      this.vfEvents[eventName] = this.vfEvents[eventName] || [];
      this.vfEvents[eventName].push(fn);
    },

    off$(eventName, fn) {
      if (this.vfEvents[eventName]) {
        if ((fn === undefined) || (fn === null)) {
          this.vfEvents[eventName].length = 0
          return
        }

        for (let i = 0; i < this.vfEvents[eventName].length; i++) {
          if (this.vfEvents[eventName][i] === fn) {
            this.vfEvents[eventName].splice(i, 1)
            break
          }
        }
      }
    },

    dispatch: function dispatch(componentName, eventName, params) {
      //debugger
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        //parent.$emit.apply(parent, [eventName].concat(params));
        if (!!parent.emit$) {
          parent.emit$.call(parent, eventName, params)
        }
      }
    },

    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};
