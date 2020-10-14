class PokemonsController < ApplicationController

    def create
        pokemon = Pokemon.new(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: params[:trainer_id] #we're sending a package & inside that package, is trainer_id
        )
        pokemon.save
        render json: pokemon.to_json
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: {}.to_json
    end
end
