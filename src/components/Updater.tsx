import { NavigationProp } from '@react-navigation/native';
import chroma from 'chroma-js';
import React from 'react';
import { View, Text } from 'react-native';
import codePush, { DownloadProgress, RemotePackage } from 'react-native-code-push';
import styled from 'styled-components';
import { RootStackParamList } from '@router/routes';
import { FlexHorizontal, Space, WindowSizeView } from './Generic/StyledComponents';
import LoadingWave, { LoadingWaveProps } from './LoadingWave';
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
  background-color: black;
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
  downloadProgress: DownloadProgress;
  status: codePush.SyncStatus;
}

class Updater extends React.Component<UpdaterProps, UpdaterState> {
  unmounted = false;
  updatedStarted = false;
  abortController = new AbortController();

  constructor(props: Readonly<UpdaterProps>) {
    super(props);
    this.state = {
      downloadProgress: {
        receivedBytes: 0,
        totalBytes: 0,
      },
      status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
    }
  }

  componentDidMount() {
    const {onFinish} = this.props;
    codePush.sync(undefined, (status) => {
      const {SyncStatus} = codePush;
      this.setState({status})
      switch (status) {
        case SyncStatus.CHECKING_FOR_UPDATE: {
          break;
        }
        case SyncStatus.AWAITING_USER_ACTION: {
          break;
        }
        case SyncStatus.DOWNLOADING_PACKAGE: {
          break;
        }
        case SyncStatus.INSTALLING_UPDATE: {
          break;
        }
        case SyncStatus.SYNC_IN_PROGRESS: {
          break;
        }
        case SyncStatus.UNKNOWN_ERROR: {
          if (onFinish) onFinish();
          break;
        }
        case SyncStatus.UPDATE_IGNORED: {
          if (onFinish) onFinish();
          break;
        }
        case SyncStatus.UPDATE_INSTALLED: {
          if (onFinish) onFinish();
          break;
        }
        case SyncStatus.UP_TO_DATE: {
          if (onFinish) onFinish();
          break;
        }
      }
    }, (downloadProgress) => {
      if (this.unmounted) return;
      this.setState({downloadProgress})
    })
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

    const wavePropsToPass: LoadingWaveProps = {
      particleCount: 5,
      waveShape: 'horizontal',
      halfDuration: 300,
      particleRenderer: (i) => {
        return (
          <View
            style={{
              width: 5,
              height: 5,
              marginRight: 10,
              backgroundColor: chroma.random().hex()
            }}
          />
        )
      },
    }

    if (progress >= 0) {
      return <ProgressBar rate={progress}/>
    } else {
      return (
        <FlexHorizontal style={{marginLeft: 10}}>
          <LoadingWave {...wavePropsToPass}/>
        </FlexHorizontal>
      );
    }
  }

  render() {
    const {status} = this.state;
    return (
      <Container>
        <UpdaterText>{updateText[status]}</UpdaterText>
        <Space height={10} />
        {this.renderProgress()}
      </Container>
    )  
  }  
}

export default Updater
