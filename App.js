import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "./src/views/Login";
import SignUp from "./src/views/SignUp";
import HomeScreen from "./src/views/HomeScreen";
import SubmittedIssues from "./src/views/SubmittedIssues";
import DraftIssues from "./src/views/DraftIssues";
import CanceledIssues from "./src/views/CanceledIssues";
import AnsweredIssues from "./src/views/AnsweredIssues";
import Overlay from "./src/views/Overlay";
import Question from "./src/views/Question";
import EditQuestion from "./src/views/EditQuestion";
import ShowObservation from "./src/views/ShowObservation";
import ShowDetails from "./src/views/ShowDetails";
import RelatedQuestionsView from "./src/views/RelatedQuestionsView";
import Search from "./src/views/Search";
import SearchNoResults from "./src/views/SearchNoResults";
import RelatedIssueView from "./src/views/RelatedIssueView";
import FAQ from "./src/views/FAQ";
import FaqElement from "./src/views/FaqElement";
import Success from "./src/views/Success";
import EvaluationFeedback from './src/views/EvaluationFeedback';

import Pusher from 'pusher-js/react-native';

class Home extends Component {
  state = {
    logging: "false"
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.retrieveData();

    Pusher.logToConsole = true;

    var pusher = new Pusher('8608bc96717dc55b1d8d', {
      cluster: 'us2',
      forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
      console.log(JSON.stringify(data));
    });
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "white",
      elevation: null
    },
    header: null
  };

  async retrieveData() {
    const value = await AsyncStorage.getItem("logging");
    const email = await AsyncStorage.getItem("email");

    console.debug(value);

    this.setState({
      logging: value
    });
  }

  render() {
    if (this.state.logging == "true") {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#3c8dbc" />
          <HomeScreen navigation={this.props.navigation} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#3c8dbc" />
          <Login navigation={this.props.navigation} />
        </View>
      );
    }
  }
}

const SideTransition = (index, position, width) => {
  const sceneRange = [index - 1, index];
  //const outputOpacity = [0, 1];
  const outputWidth = [width, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputWidth
  });

  return {
    //opacity: transition
    transform: [{ translateX: transition }]
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: sceneProps => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;
      const width = sceneProps.layout.initWidth;

      return SideTransition(index, position, width);
    }
  };
};

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home"
      }
    },

    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "HomeScreen"
      }
    },

    EvaluationFeedback: {
      screen: EvaluationFeedback,
      navigationOptions: {
        title: "EvaluationFeedback"
      }
    },

    RelatedQuestionsView: {
      screen: RelatedQuestionsView,
      navigationOptions: {
        title: "Perguntas relacionadas"
      }
    },

    Search: {
      screen: Search,
      navigationOptions: {
        title: "Como posso te ajudar?"
      }
    },

    SearchNoResults: {
      screen: SearchNoResults,
      navigationOptions: {
        title: "Search"
      }
    },

    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    },

    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Cadastro"
      }
    },

    EditQuestion: {
      screen: EditQuestion,
      navigationOptions: {
        title: "Editar pergunta"
      }
    },

    Question: {
      screen: Question,
      navigationOptions: {
        title: "Como posso te ajudar?"
      }
    },

    DraftIssues: {
      screen: DraftIssues,
      navigationOptions: {
        title: "Rascunhos"
      }
    },

    CanceledIssues: {
      screen: CanceledIssues,
      navigationOptions: {
        title: "Devolvidas/Canceladas"
      }
    },

    AnsweredIssues: {
      screen: AnsweredIssues,
      navigationOptions: {
        title: "Respondidas"
      }
    },

    SubmittedIssues: {
      screen: SubmittedIssues,
      navigationOptions: {
        title: "Enviadas"
      }
    },

    Overlay: {
      screen: Overlay,
      navigationOptions: {
        title: "Respondidas"
      }
    },

    ShowObservation: {
      screen: ShowObservation,
      navigationOptions: {
        title: "Observação"
      }
    },

    RelatedIssueView: {
      screen: RelatedIssueView,
      navigationOptions: {
        title: "Pergunta relacionada"
      }
    },

    ShowDetails: {
      screen: ShowDetails,
      navigationOptions: {
        title: "Detalhes"
      }
    },

    FAQ: {
      screen: FAQ,
      navigationOptions: {
        title: "Dúvidas frequentes"
      }
    },

    FaqElement: {
      screen: FaqElement,
      navigationOptions: {
        title: "Dúvida"
      }
    },

    Success: {
      screen: Success
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#3c8dbc"
      }
    },
    navigationOptions: {
      tabBarLabel: "Home!"
    },
    transitionConfig: NavigationConfig
  }
);

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
