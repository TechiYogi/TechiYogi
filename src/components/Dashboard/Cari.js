import React, { useState } from 'react';
/*import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  CardTitle
} from 'reactstrap';

const items = [
  {
    src: 'logo192.png',
    altText: 'Slide 1',
    caption: 'Benifits of Yog',
    preq:`Some test data to 2`
  },
  {
    src: 'logo192.png',
    altText: 'Slide 2',
    caption: 'Slide 2',
    preq:`Some test data to load 2fjsdlkfjlksjflkfl
          dsjflkjlksjlkfjsdlkfjslkdfjlksdf
          dfjsldkjlskdfjlksdjlksdj`
  },
  {
    src: 'logo192.png',
    altText: 'Slide 3',
    caption: 'Slide 3',
    preq:'Some test data to 3'
  }
];


const Cari = () => 
{
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const Colap = (props) => (
    <div>
      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
        Toggle
      </Button>
      <UncontrolledCollapse toggler="#toggler">
        <Card>
          <CardBody>
              {props.preq}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
  );

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <div> 
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}

      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
     
      <Colap preq={item.preq}  /></div>
    );
  });

  return (
    <div>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />

    </Carousel>
    
    </div>
  );
}*/




//export default Cari;
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { Carousel } from 'react-carousel-minimal';



function Cari() {

  const Colap = (props) => {

    return(
    <div>
      hi
      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
        Toggle
      </Button>
      <UncontrolledCollapse toggler="#toggler">
        <Card>
          <CardBody>
              {props.data}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
    );
  }

 const data = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: `<div>
      San Francisco
      <br/>
      <div>
     ${Colap('hi')}
      <button>Health</button>
      </div>
    </div>`
    },
    {
      image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
      caption: "Scotland"
    },
    {
      image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
      caption: "Darjeeling"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
      caption: "San Francisco"
    },
    {
      image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
      caption: "Scotland"
    },
    {
      image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
      caption: "Darjeeling"
    },
    {
      image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
      caption: "San Francisco"
    },
    {
      image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
      caption: "Scotland"
    },
    {
      image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
      caption: "Darjeeling"
    }
  ];


  

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div >
      <div style={{ textAlign: "center" }}>
        <h2>React Carousel Minimal</h2>
        <p>Easy to use, responsive and customizable carousel component for React Projects.</p>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            index={data.index}
            data={data}
            time={2000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={false}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            onClick={(index,i)=>{
              alert(i)
            }}
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>


    </div>
  );
}

export default Cari;