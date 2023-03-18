pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t img_plannr_frontend .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker stop cont_plannr_frontend || true'
                sh 'docker rm cont_plannr_frontend || true'
                sh 'docker run -d --name cont_plannr_frontend -p 3000:3000 img_plannr_frontend'
            }
        }
    }
}