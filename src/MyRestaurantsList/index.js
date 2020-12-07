import React, { useEffect, useState} from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import '../index.css'


const Fav = ({restaurant, favorite, removeFavorite}) => {
  let f = false
  if(favorite != undefined) {
      f = favorite.favorite

  }
  const [isFavorite, setFavorite] = useState(f);
  useEffect(()=> { setFavorite(f) }, [f])
  const handleClick = async () => {

    try {
      if(favorite != undefined){
        const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/" + favorite.id
        const updatedFavoriteInfo = {favorite: !isFavorite}
        const updateResponse = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(updatedFavoriteInfo),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log("updateResponse", updateResponse)
        const updateJson = await updateResponse.json()
        console.log("updateJson", updateJson)

        if(updateResponse.status == 200) {
        }
      }else{
        const url = process.env.REACT_APP_API_URL + "/api/v1/favorites/" + restaurant.id
        const updatedFavoriteInfo = { favorite: !isFavorite }
        const updateResponse = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(updatedFavoriteInfo),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log("updateResponse", updateResponse)
        const updateJson = await updateResponse.json()
        console.log("updateJson", updateJson)

        if(updateResponse.status == 200) {
          // update favorite state
        }
      }
      setFavorite(!isFavorite)
      removeFavorite(favorite)

    } catch(err) {
      console.log("Error updating  info: ", err)
    }

  }
  return(

        <Button onClick={()=> { handleClick()}} icon>
          { isFavorite ? <Icon name='heart' color='pink' /> : <Icon name='heart outline' color='pink' /> }
        </Button>
  )
}

export default function MyRestaurantsList(props) {
  const restaurants = props.restaurants.map(fav => {
    let restaurant = fav.restaurant_id
    return (
      <Card color='brown' key={restaurant.id}>
        <Image centered={true} className="restaurantImage" src={restaurant.image_url} />
        <Card.Content>
          <Card.Header>
            <a href={restaurant.url}>{restaurant.name}</a>
          </Card.Header>
          <Card.Meta>{restaurant.title}</Card.Meta>
          <Card.Meta>{restaurant.address1}</Card.Meta>
          <Card.Meta>{restaurant.city}, {restaurant.state} {restaurant.zip_code}</Card.Meta>
          <Card.Meta>Rating: {restaurant.rating}</Card.Meta>
          <Card.Meta>Heat Lamps: {restaurant.heat_lamps == true ? 'Yes': 'No'}</Card.Meta>
        </Card.Content>
        {
          JSON.parse(localStorage.getItem('userData')).id == restaurant.uploader.id
          ?
          <Card.Content extra>
            <Button
              basic color='brown' onClick={()=> props.editRestaurant(fav.id)}>
              Edit
            </Button>
            <Button
              basic color='brown'
              onClick={()=> props.deleteRestaurant(restaurant.id)}>
              Delete
            </Button>
          </Card.Content>
          :
          ''
        }
        <Card.Content extra>
          <Fav
            restaurant={restaurant}
            favorite={fav}
            removeFavorite={props.removeFavorite}
            />
          <Button color='brown'>Review</Button>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={true}>
      {restaurants}
    </Card.Group>
  )
}
