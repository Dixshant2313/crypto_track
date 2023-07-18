import { Container, Typography, styled } from '@mui/material';
import Carousel from './Carousel';

const BannerContainer = styled('div')`
  background-image: url(./banner2.jpg);
`;

const BannerContent = styled(Container)`
  height: 400px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  justify-content: space-around;
`;

const TaglineContainer = styled('div')`
  display: flex;
  height: 40%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const CarouselContainer = styled('div')`
  height: 50%;
  display: flex;
  align-items: center;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <TaglineContainer>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Track
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </TaglineContainer>
        <CarouselContainer>
          <Carousel/>
        </CarouselContainer>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
