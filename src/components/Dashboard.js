import React, {Component} from 'react';
import classnames from 'classnames';
import Loading from 'components/Loading';
import Panel from 'components/Panel';
console.log('data====', Panel);
//fake data
const data = [
  {
    id: 1,
    label: 'Total Interviews',
    value: 6,
  },
  {
    id: 2,
    label: 'Least Popular Time Slot',
    value: '1pm',
  },
  {
    id: 3,
    label: 'Most Popular Day',
    value: 'Wednesday',
  },
  {
    id: 4,
    label: 'Interviews Per Day',
    value: '2.3',
  },
];
class Dashboard extends Component {
  state = {
    loading: false,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {},
  };
  /*passing a reference to the instance method as a prop
  sets the value of focused back to null if the value of focused is currently set to a panel*/
  selectPanel(id) {
    this.setState((previousState) => ({
      focused: previousState.focused !== null ? null : id,
    }));
  }
  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem('focused'));

    if (focused) {
      this.setState({focused});
    }
  }
  /* has access to the props and state from the previous update. We compare them to the existing state, and if the values change, we write the value to localStorage*/
  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem('focused', JSON.stringify(this.state.focused));
    }
  }
  render() {
    const dashboardClasses = classnames('dashboard', {
      'dashboard--focused': this.state.focused,
    });
    //filters panel data before converting it to components
    if (this.state.loading) {
      return <Loading />;
    }
    console.log('data_____', data);
    const func = function (input) {
      console.log('input+++++', input);
    };
    const panels = data
      .filter(
        (panel) =>
          this.state.focused === null || this.state.focused === panel.id
      )
      .map((panel) => (
        // func(panel) &&
        <Panel
          key={panel.id}
          // id={panel.id}
          label={panel.label}
          value={panel.value}
          onSelect={() => this.selectPanel(panel.id)}
        />
      ));
    console.log('.panel.id..', Panel);
    return <main className={dashboardClasses}>{panels}</main>;
  }

}

export default Dashboard;

//(can replace instance method)binds:when we call this.setState it will be the setState method of the Dashboard component
// constructor(props) {
//   super(props);
//   this.selectPanel = this.selectPanel.bind(this);
// }
