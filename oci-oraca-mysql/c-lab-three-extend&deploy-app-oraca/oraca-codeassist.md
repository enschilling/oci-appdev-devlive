# Build a microservices application using Oracle AI Code Assist 

## Introduction

In this workshop you'll enhance the existing microservices application with a brand new component. Watch as we use Oracle AI Code Assist to generate all the code for a Spring Boot-based Java app. That code has been provided as part of the workshop resources so now it's time to package and deploy it.

For this portion of the workshop, you have three different options to pick from:
1. [ ~20 minutes ] Build, package, and deploy the code entirely on your own.
2. [] ~10 minutes ] Run the pre-built script provided to automatically build and package the new app component. Then deploy to kubernetes.
3. [ ~5 minutes ] Deploy the new app component with the container image provided

Estimated time: Up to 20 minutes

### Objectives

* Deploy stuff

<details><summary><b>Option 1 - DIY</b><summary>

## Task 1: Build and Package the new App

Stuff here

        ```bash
        <copy>
        test code block
        </copy>
        ```

## Task 2: Deploy the App

---

</details>

<details><summary><b>Option 2 - The Automated Way</b><summary>

## Task 1: Run the build script

Stuff here

---

</details>

<details><summary><b>Option 3 - Just deploy</b><summary>

## Task 1: Deploy the pre-built image

1. Create a new file called `admessage.yaml` and paste the following:

        ```
        <copy>
        apiVersion: v1
        kind: Service
        metadata:
        name: admessage
        spec:
        type: LoadBalancer
        selector:
            app: admessage
        ports:
            - protocol: TCP
            port: 8082
            targetPort: 8082
        externalTrafficPolicy: Local
        ---
        apiVersion: apps/v1
        kind: StatefulSet
        metadata:
        name: admessage
        namespace: default 
        spec:
        serviceName: "admessage"
        replicas: 1
        selector:
            matchLabels:
            app: admessage
        template:
            metadata:
            annotations:
                instrumentation.opentelemetry.io/inject-java: "opentelemetry-operator-system/inst-apm-java"
            labels:
                app: admessage
            spec:
            containers:
            - name: admessage
                image:  phx.ocir.io/axywji1aljc2/winestore:admessage.v1.0
                command: ["java", "-jar", "./AdMessage.jar", "--server.port=8082", "--spring.datasource.url=jdbc:mysql://10.0.10.165/wine", "--spring.datasource.username=wine", "--spring.datasource.password=O&Mdemo1"]
                ports:
                - containerPort: 8083
        </copy>
        ```

---

</details>


You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Wojciech Pluta, Principal Staff Developer
- **Contributors** -
Victor Martin, Product Strategy Directory 
Eli Schilling, Developer Advocate
* **Last Updated By/Date** - Eli Schilling, February 2024