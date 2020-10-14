class TrainersController < ApplicationController

    def index
        render json: Trainer.all.to_json(include: :pokemons)
    end

    def show
        render json: Trainer.find(params[:id]).to_json(include: :pokemons)
    end 
end
