import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

export interface Rating {
  rate: number;
  count: number;
}
export type RootParamList = {
  Home: undefined;
  Profile: undefined;
  ProductDetails: {data: Product};
};
export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: Rating; // ek aur type
}
export type HomeScreenNavigationProp = DrawerNavigationProp<
  RootParamList,
  'Home'
>;
export interface CustomButtonProps {
  title: string;
  onClickCustomButton: () => void;
  styles?: string; // hai to baat kar, nhi to nikal
}
export interface StoreProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: any; // Adjust based on the actual rating type
}
export interface HeaderProps {
  title?: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
}

export interface ProductsState {
  data: Product[];
  isLoading: boolean;
}
export interface RootState {
  product: ProductsState;
  wishlist: WishlistState;
}
export type MyComponentProps = {
  size: string;
  route: RouteProp<RootParamList, 'ProductDetails'>;
};



export interface WishlistState {
  data: StoreProduct[];
}
export type RootStackParamList = {
  ProductDetails: {data: StoreProduct}; // Define the route and its params here
  // other routes
};
export type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;
export type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;
