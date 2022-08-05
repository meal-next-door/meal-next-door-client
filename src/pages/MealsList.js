import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

function MealsList(props) {

    const { user } = useContext(AuthContext);

    return (
        <div className="MealsList">

            {user?.role === "cook"
                ? <button>Add your own meal</button>
                : <p> </p>
            }

            {props.meals?.map((meal) => {
                return (
                    <div className="meals card" key={meal._id} >
                        <h3>{meal.title}</h3>
                        <p>Description: {meal.description}</p>
                        <p>Cook: {meal.cook?.username}</p>

                        <NavLink to={`/meals/${meal._id}`}>
                            <button>View details</button>
                        </NavLink>
                    </div>
                );
            })}

        </div>
    );
}

export default MealsList;