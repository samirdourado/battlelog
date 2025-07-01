import egg from '@/../public/origins_assets/rankings/egg.png';
import chick from '@/../public/origins_assets/rankings/chick.png';
import hare from '@/../public/origins_assets/rankings/hare.png';
import boar from '@/../public/origins_assets/rankings/boar.png';
import bear from '@/../public/origins_assets/rankings/bear.png';
import wolf from '@/../public/origins_assets/rankings/wolf.png';
import tiger from '@/../public/origins_assets/rankings/tiger.png';
import dragon from '@/../public/origins_assets/rankings/dragon.png';
import challenger from '@/../public/origins_assets/rankings/challenger.png';

const rankingImage = (rank: string) => {

    const imgRank = rank.toLowerCase();

    if (imgRank === 'egg') {
        return egg;
    } else if (imgRank === 'chick') {
        return chick;
    } else if (imgRank === 'hare') {
        return hare;
    } else if (imgRank === 'boar') {
        return boar;
    } else if (imgRank === 'bear') {
        return bear;
    } else if (imgRank === 'wolf') {
        return wolf;
    } else if (imgRank === 'tiger') {
        return tiger;
    } else if (imgRank === 'dragon') {
        return dragon;
    } else if (imgRank === 'challenger') {
        return challenger;
    }
    return null;
};

export default rankingImage;