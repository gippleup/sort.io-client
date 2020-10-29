import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import codePush, { DownloadProgress, RemotePackage } from 'react-native-code-push';
import styled from 'styled-components';
import { RootStackParamList } from '../router/routes';
import { FlexHorizontal, Space, WindowSizeView } from './Generic/StyledComponents';
import ProgressBar from './ProgressBar';

const updateText = {
  [codePush.SyncStatus.AWAITING_USER_ACTION]: "Waiting Action",
  [codePush.SyncStatus.CHECKING_FOR_UPDATE]: "Checking Update",
  [codePush.SyncStatus.DOWNLOADING_PACKAGE]: "Downloading Update",
  [codePush.SyncStatus.INSTALLING_UPDATE]: "Installing Update",
  [codePush.SyncStatus.SYNC_IN_PROGRESS]: "Syncing",
  [codePush.SyncStatus.UNKNOWN_ERROR]: "Unknown Error",
  [codePush.SyncStatus.UPDATE_IGNORED]: "Update Ignored",
  [codePush.SyncStatus.UPDATE_INSTALLED]: "Update Installed",
  [codePush.SyncStatus.UP_TO_DATE]: "Already Up to Date",
}

const Container: typeof WindowSizeView = styled(WindowSizeView)`
  background-color: royalblue;
  align-items: center;
  justify-content: center;
`;

const UpdaterText: typeof Text = styled(Text)`
  color: white;
`;

type UpdaterProps = {
  onFinish?: Function;
}

type UpdaterState = {
  availableUpdate: null | RemotePackage;
  downloadProgress: DownloadProgress;
  status: codePush.SyncStatus;
}

class Updater extends React.Component<UpdaterProps, UpdaterState> {
  unmounted = false;
  updatedStarted = false;

  constructor(props: Readonly<UpdaterProps>) {
    super(props);
    this.state = {
      availableUpdate: null,
      downloadProgress: {
        receivedBytes: 0,
        totalBytes: 0,
      },
      status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
    }
  }

  componentDidMount() {
    const {onFinish} = this.props;
    codePush.checkForUpdate()
    .then((availableUpdate) => {
      if (this.unmounted) return;
      this.setState({
        availableUpdate,
      })
    })

    codePush.sync(undefined, (status) => {
      const {SyncStatus} = codePush;
      this.setState({status})
      switch (status) {
        case SyncStatus.CHECKING_FOR_UPDATE: {
          console.log("Checking for Update");
          break;
        }
        case SyncStatus.AWAITING_USER_ACTION: {
          console.log("Waiting User Action");
          break;
        }
        case SyncStatus.DOWNLOADING_PACKAGE: {
          console.log("Downloading Package");
          break;
        }
        case SyncStatus.INSTALLING_UPDATE: {
          console.log("Installing Update");
          break;
        }
        case SyncStatus.SYNC_IN_PROGRESS: {
          console.log("Syncing");
          break;
        }
        case SyncStatus.UNKNOWN_ERROR: {
          if (onFinish) onFinish();
          console.log("Unknown Error");
          break;
        }
        case SyncStatus.UPDATE_IGNORED: {
          if (onFinish) onFinish();
          console.log("Update Ignored");
          break;
        }
        case SyncStatus.UPDATE_INSTALLED: {
          if (onFinish) onFinish();
          console.log("Update Installed");
          break;
        }
        case SyncStatus.UP_TO_DATE: {
          if (onFinish) onFinish();
          console.log("Already Up to Date");
          break;
        }
      }
    }, (downloadProgress) => {
      if (this.unmounted) return;
      this.setState({downloadProgress})
    })
  }

  componentDidUpdate() {
    const {availableUpdate} = this.state;
    if (availableUpdate && !this.updatedStarted) {
      this.updatedStarted = true;
      availableUpdate.download();
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  renderProgress() {
    const {status, downloadProgress} = this.state;
    let progress = -1;
    if (status === codePush.SyncStatus.DOWNLOADING_PACKAGE) {
      const {receivedBytes, totalBytes} = downloadProgress;
      progress = receivedBytes / totalBytes;
    } else if (status === codePush.SyncStatus.INSTALLING_UPDATE) {
    } else if (status === codePush.SyncStatus.SYNC_IN_PROGRESS) {
    }

    if (progress >= 0) {
      return (
        <>
          <Space height={10} />
          <ProgressBar rate={progress}/>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  render() {
    const {status} = this.state;
    return (
      <Container>
        <UpdaterText>{updateText[status]}</UpdaterText>
        {this.renderProgress()}
      </Container>
    )  
  }  
}

export default Updater
