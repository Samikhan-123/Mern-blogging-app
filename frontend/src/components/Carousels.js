import React from 'react';
import { Carousel, CarouselItem, CarouselCaption, Image } from 'react-bootstrap';


const Carousels = () => {
    return (
        <Carousel controls indicators>
            <CarouselItem>
                <Image style={{ objectFit: 'cover' }} className="d-block w-100 vh-100" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="slide 1" />
                <CarouselCaption className="d-none d-md-block">
                    <h5>Create Your Blogs</h5>
                    <p>Let Your Creativity Flow And Connect With The World Through Your Writings.</p>
                </CarouselCaption>
            </CarouselItem>
            <CarouselItem>
                <Image style={{ objectFit: 'cover' }} className="d-block w-100 vh-100" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="slide 2" />
                <CarouselCaption className="d-none d-md-block">
                    <h5>Discover Exciting Blog Ideas</h5>
                    <p>Explore A World Of Possibilities And Find Inspiration For Your Blogs.</p>
                </CarouselCaption>
            </CarouselItem>
            <CarouselItem>
                <Image style={{ objectFit: 'cover' }} className="d-block w-100 vh-100" src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="slide 3" />
                <CarouselCaption className="d-none d-md-block">
                    <h5>Explore Blogging Adventures</h5>
                    <p>Share Your Stories, Gain Insights, And Connect With A Community Of Like-Minded Individuals.</p>
                </CarouselCaption>
            </CarouselItem>
        </Carousel>
    );
};

export default Carousels;
