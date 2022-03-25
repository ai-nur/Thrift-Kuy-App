import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { COLORS, SIZES,
  IconCart,
  IconCartActive,
  IconCategory,
  IconCategoryActive,
  IconHome,
  IconHomeActive,
  IconProfile,
  IconProfileActive,
} from '../constants';

const Icon = ({isFocused, label}) => {
  switch(label) {
    case 'Home':
      return isFocused ? <IconHomeActive /> : <IconHome />;
    case 'Category':
      return isFocused ? <IconCategoryActive /> : <IconCategory />;
    case 'Cart':
      return isFocused ? <IconCartActive /> : <IconCart />;
    case 'Profile':
      return isFocused ? <IconProfileActive /> : <IconProfile />;
    default: return <IconHome />;
  }
};


const BottomNav = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
          key={index}
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={styles.containerTab}>
          <Icon label={label} isFocused={isFocused}/>
          {/* <Text style={styles.textTab(isFocused)}>{label}</Text> */}
        </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  containerTab: {
    alignItems: 'center',
  },
  textTab: isFocused => ({
    fontSize: SIZES.h4,
    color: isFocused ? COLORS.secondary : COLORS.white,
    marginTop: 8,
  }),
});
