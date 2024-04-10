// Respuesta de API con estadísticas de los modelos y datasets.
export interface Estadisticas {
  dataset: {
    original: [number, number];
    training: {
      X: [number, number];
      y: [number, number];
    };
    testing: {
      X: [number, number];
      y: [number, number];
    };
  };
  models: {
    random_forest: {
      mse: number;
      rmse: number;
      ci: [number, number];
      mae: number;
      r2: number;
      feature_importances: number[];
      max_features: number;
      max_depth: number | null;
      n_estimators: number;
      oob_score: boolean;
    };
    svm: {
      mse: number;
      rmse: number;
      ci: [number, number];
      mae: number;
      r2: number;
      kernel: string;
      C: number;
      epsilon: number;
    };
    neural_network: {
      mse: number;
      rmse: number;
      ci: [number, number];
      mae: number;
      r2: number;
      learning_rate: number;
      beta_1: number;
      beta_2: number;
      epsilon: number;
    };
  };
}
