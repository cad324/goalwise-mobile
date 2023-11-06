import { View } from "react-native";
import Svg, { Path, Defs, Text, LinearGradient, Stop } from 'react-native-svg';

type CreditScoreProps = {
    score: number
}

type Rating = 'Poor' | 'Fair' | 'Good' | 'Excellent' | 'Legendary';

const rateScore = (score: number): {rating: Rating, color: string} => {
  if (score > 850 || score < 300) throw RangeError;
  if (score < 560) return {rating: 'Poor', color: 'red'}
  if (score < 700) return {rating: 'Fair', color: 'orange'}
  if (score < 750) return {rating: 'Good', color: 'darkgreen'}
  if (score < 840) return {rating: 'Excellent', color: 'green'}
  return {rating: 'Legendary', color: 'purple'};
}

const posRatingX: Record<Rating, string> = {
    'Poor': "110",
    'Fair': "115",
    'Good': "110",
    'Excellent': "94",
    'Legendary': "89"
}

export default function ScoreArc({score}: CreditScoreProps) {
    const {rating, color} = rateScore(score);
    return (
      <View style={{alignItems: 'center'}}>
        <Svg width={271} height={159} viewBox="0 0 271 159">
            <Text x="95.109" y="100.1364" fill="#505050" fontSize={42} fontWeight="bold" letterSpacing="0">
                {score}
            </Text>
            <Text x={posRatingX[rating]} y="140.682" fill={color} fontSize={20} fontWeight="600" letterSpacing="0">
                {rating}
            </Text>
            <Path
            d="M269.662 154.497C272.408 135.103 270.917 115.345 265.291 96.5836C259.666 77.8221 250.04 60.5031 237.076 45.82C224.113 31.1369 208.12 19.4389 190.2 11.5318C172.281 3.62473 152.86 -0.303339 133.275 0.0182345C113.691 0.339808 94.4096 4.90338 76.759 13.3945C59.1084 21.8857 43.5085 34.1025 31.0341 49.2032C18.5597 64.304 9.50748 81.9297 4.50104 100.866C-0.505389 119.802 -1.34697 139.598 2.03428 158.891L28.7274 154.213C26.0224 138.779 26.6957 122.942 30.7008 107.793C34.706 92.6437 41.9478 78.5432 51.9273 66.4626C61.9068 54.382 74.3867 44.6085 88.5072 37.8156C102.628 31.0227 118.053 27.3718 133.72 27.1146C149.388 26.8573 164.924 29.9998 179.26 36.3254C193.596 42.6511 206.39 52.0095 216.761 63.756C227.132 75.5025 234.833 89.3576 239.333 104.367C243.833 119.376 245.026 135.183 242.829 150.697L269.662 154.497Z"
            fill="url(#paint0_linear_3_10)"
            />
            <Defs>
                <LinearGradient id="paint0_linear_3_10" x1="1.26816" y1="116.998" x2="269.592" y2="154.992" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#FF0000" />
                    <Stop offset="0.5" stopColor="#F3F806" />
                    <Stop offset="1" stopColor="#05FE00" />
                </LinearGradient>
            </Defs>
        </Svg>
      </View>
    );
}