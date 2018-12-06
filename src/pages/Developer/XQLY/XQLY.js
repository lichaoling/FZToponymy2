import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import XQLYForm from '../../../common/Components/Forms/XQLYForm';
import st from './XQLY.less';

class XQLY extends Component {
  componentDidMount() { }
  render() {
    return (
      <div className={st.XQLY}>
        <div className={st.Content}>
          <XQLYForm isApproval={false} />
        </div>
      </div>
    );
  }
}
export default XQLY;