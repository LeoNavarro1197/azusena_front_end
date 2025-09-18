import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Model({ isSpeaking }) {
  const group = useRef();
  const { scene, materials } = useGLTF('path/AzuIdle.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  // Cargar las animaciones
  const { animations: idleAnimations } = useGLTF('path/AzuIdle.glb');
  const { animations: talkingAnimations } = useGLTF('path/AzuTalking.glb');

  // Obtener acciones de animación
  const { actions: idleActions } = useAnimations(idleAnimations, group);
  const { actions: talkingActions } = useAnimations(talkingAnimations, group);

  // Tiempo de transición
  const transitionDuration = 1.5; // En segundos

  // Suavizado de materiales
  var rough = 0.2;
  var metal = 0;

  materials['Material.008'].roughness = rough;
  materials['Material.008'].metallic = metal;
  materials['Material.002'].roughness = rough;
  materials['Material.002'].metallic = metal;
  materials['Material.003'].roughness = rough;
  materials['Material.003'].metallic = metal;
  materials['face'].metallic = metal;
  materials['face'].roughness = rough;
  materials['ojos'].metallic = metal;
  materials['ojos'].roughness = rough;
  materials['pestañas'].alphaToCoverage = true;

  // Función para iniciar la animación de "hablando" con transición suave
  const startTalkingAnimation = () => {
    const idleAction = idleActions?.['rigAction'];
    const talkingAction = talkingActions?.['rigAction'];

    if (idleAction && talkingAction) {
      if (!talkingAction.isRunning()) {
        talkingAction.reset();
        talkingAction.fadeIn(transitionDuration).play();
        idleAction.crossFadeTo(talkingAction, transitionDuration, false); 
      }
    }
  };

  // Función para volver a la animación "idle" con transición suave
  const startIdleAnimation = () => {
    const idleAction = idleActions?.['rigAction'];
    const talkingAction = talkingActions?.['rigAction'];

    if (idleAction && talkingAction) {
      if (!idleAction.isRunning()) {
        idleAction.reset();
        idleAction.fadeIn(transitionDuration).play();
        talkingAction.crossFadeTo(idleAction, transitionDuration, false); 
      }
    }
  };

  // Controlar animaciones basadas en el valor de `isSpeaking`
  useEffect(() => {
    if (isSpeaking) {
      startTalkingAnimation();
    } else {
      startIdleAnimation();
    }
  }, [isSpeaking]);

  // Reproducir la animación "idle" por defecto cuando el componente cargue
  useEffect(() => {
    if (idleActions?.['rigAction']) {
      idleActions['rigAction'].fadeIn(transitionDuration).play(); 
    }
  }, [idleActions]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="metarig">
          <primitive object={nodes.spine005} />
        </group>
        <group name="rig">
          <primitive object={nodes.root} />
          <primitive object={nodes.neutral_bone} />
          <group name="retopology">
            <skinnedMesh name="Plane" geometry={nodes.Plane.geometry} material={materials.face} skeleton={nodes.Plane.skeleton} />
            <skinnedMesh name="Plane_1" geometry={nodes.Plane_1.geometry} material={materials['Material.003']} skeleton={nodes.Plane_1.skeleton} />
            <skinnedMesh name="Plane_2" geometry={nodes.Plane_2.geometry} material={materials['Material.002']} skeleton={nodes.Plane_2.skeleton} />
            <skinnedMesh name="Plane_3" geometry={nodes.Plane_3.geometry} material={materials['Material.003']} skeleton={nodes.Plane_3.skeleton} />
          </group>
        </group>
        <group name="WGT-rig_eyeL" position={[0.24, 0.099, 1.79]} rotation={[Math.PI / 2, 0, 0]} scale={0.151} />
        <group name="WGT-rig_eyeR" position={[-0.24, 0.099, 1.79]} rotation={[-Math.PI / 2, 0, 0]} scale={-0.151} />
        <group name="WGT-rig_eyes" position={[0, 0.099, 1.79]} rotation={[Math.PI / 2, 0, 0]} scale={0.151} />
        <group name="WGT-rig_master_eyeL" position={[0.24, 0.099, 0.348]} rotation={[Math.PI, 0, Math.PI]} scale={0.102} />
        <group name="WGT-rig_master_eyeR" position={[-0.24, 0.099, 0.348]} rotation={[0, 0, Math.PI]} scale={-0.102} />
        <group name="WGT-rig_nose_master" position={[0, -0.223, 0.63]} rotation={[Math.PI, 0, Math.PI]} scale={0.075} />
        <group name="WGT-rig_earL" position={[0.56, -0.153, -0.037]} rotation={[1.326, -0.177, 0.165]} scale={0.182} />
        <group name="WGT-rig_earR" position={[-0.56, -0.153, -0.037]} rotation={[-1.816, -0.177, 0.165]} scale={-0.182} />
        <group name="WGT-rig_jaw_master" position={[0, -0.089, 0.028]} rotation={[-2.289, 0, 0]} scale={0.722} />
        <group name="WGT-rig_teethT" position={[0, -0.267, 0.559]} scale={0.21} />
        <group name="WGT-rig_teethB" position={[0, -0.446, 0.524]} scale={0.21} />
        <group name="WGT-rig_tongue_master" position={[0, -0.326, 0.358]} rotation={[-2.924, 0, 0]} scale={0.119} />
        <group name="WGT-rig_browBL" position={[0.359, 0.127, 0.439]} rotation={[Math.PI / 2, 0, 0.065]} scale={0.043} />
        <group name="WGT-rig_browBL001" position={[0.312, 0.154, 0.466]} rotation={[Math.PI / 2, 0, -0.234]} scale={0.043} />
        <group name="WGT-rig_browBL002" position={[0.254, 0.169, 0.481]} rotation={[Math.PI / 2, 0, -0.021]} scale={0.043} />
        <group name="WGT-rig_browBL003" position={[0.181, 0.155, 0.477]} rotation={[Math.PI / 2, 0, -0.097]} scale={0.043} />
        <group name="WGT-rig_browBL004" position={[0.126, 0.111, 0.486]} rotation={[Math.PI / 2, 0, -0.097]} scale={0.043} />
        <group name="WGT-rig_browBR" position={[-0.359, 0.127, 0.439]} rotation={[-Math.PI / 2, 0, 0.065]} scale={-0.043} />
        <group name="WGT-rig_browBR001" position={[-0.312, 0.154, 0.466]} rotation={[-Math.PI / 2, 0, -0.234]} scale={-0.043} />
        <group name="WGT-rig_browBR002" position={[-0.254, 0.169, 0.481]} rotation={[-Math.PI / 2, 0, -0.021]} scale={-0.043} />
        <group name="WGT-rig_browBR003" position={[-0.181, 0.155, 0.477]} rotation={[-Math.PI / 2, 0, -0.097]} scale={-0.043} />
        <group name="WGT-rig_browBR004" position={[-0.126, 0.111, 0.486]} rotation={[-Math.PI / 2, 0, -0.097]} scale={-0.043} />
        <group name="WGT-rig_browTL" position={[0.401, 0.073, 0.365]} rotation={[Math.PI / 2, 0, 0.025]} scale={0.043} />
        <group name="WGT-rig_browTL001" position={[0.374, 0.196, 0.45]} rotation={[Math.PI / 2, 0, -0.143]} scale={0.043} />
        <group name="WGT-rig_browTL002" position={[0.268, 0.229, 0.536]} rotation={[Math.PI / 2, 0, -0.226]} scale={0.043} />
        <group name="WGT-rig_browTL003" position={[0.1, 0.2, 0.589]} rotation={[Math.PI / 2, 0, -0.043]} scale={0.043} />
        <group name="WGT-rig_browTR" position={[-0.401, 0.073, 0.365]} rotation={[-Math.PI / 2, 0, 0.025]} scale={-0.043} />
        <group name="WGT-rig_browTR001" position={[-0.374, 0.196, 0.45]} rotation={[-Math.PI / 2, 0, -0.143]} scale={-0.043} />
        <group name="WGT-rig_browTR002" position={[-0.268, 0.229, 0.536]} rotation={[-Math.PI / 2, 0, -0.226]} scale={-0.043} />
        <group name="WGT-rig_browTR003" position={[-0.1, 0.2, 0.589]} rotation={[-Math.PI / 2, 0, -0.043]} scale={-0.043} />
        <group name="WGT-rig_cheekBL001" position={[0.276, -0.238, 0.52]} rotation={[Math.PI / 2, 0, -0.124]} scale={0.043} />
        <group name="WGT-rig_cheekBR001" position={[-0.276, -0.238, 0.52]} rotation={[-Math.PI / 2, 0, -0.124]} scale={-0.043} />
        <group name="WGT-rig_cheekTL001" position={[0.247, -0.107, 0.531]} rotation={[Math.PI / 2, 0, -0.084]} scale={0.043} />
        <group name="WGT-rig_cheekTR001" position={[-0.247, -0.107, 0.531]} rotation={[-Math.PI / 2, 0, -0.084]} scale={-0.043} />
        <group name="WGT-rig_chin" position={[0, -0.632, 0.504]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_chin001" position={[0, -0.574, 0.564]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_chin002" position={[0, -0.494, 0.56]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_chinL" position={[0.157, -0.579, 0.455]} rotation={[Math.PI / 2, 0, 0.097]} scale={0.043} />
        <group name="WGT-rig_chinR" position={[-0.157, -0.579, 0.455]} rotation={[-Math.PI / 2, 0, 0.097]} scale={-0.043} />
        <group name="WGT-rig_earL002" position={[0.61, 0.064, -0.195]} rotation={[Math.PI / 2, 0, -0.129]} scale={0.043} />
        <group name="WGT-rig_earL003" position={[0.581, -0.076, -0.253]} rotation={[Math.PI / 2, 0, 0.584]} scale={0.043} />
        <group name="WGT-rig_earL004" position={[0.565, -0.245, -0.084]} rotation={[Math.PI / 2, 0, -0.7]} scale={0.043} />
        <group name="WGT-rig_earR002" position={[-0.61, 0.064, -0.195]} rotation={[-Math.PI / 2, 0, -0.129]} scale={-0.043} />
        <group name="WGT-rig_earR003" position={[-0.581, -0.076, -0.253]} rotation={[-Math.PI / 2, 0, 0.584]} scale={-0.043} />
        <group name="WGT-rig_earR004" position={[-0.565, -0.245, -0.084]} rotation={[-Math.PI / 2, 0, -0.7]} scale={-0.043} />
        <group name="WGT-rig_jaw" position={[0, -0.678, 0.238]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_jawL" position={[0.486, -0.089, 0.028]} rotation={[Math.PI / 2, 0, -0.051]} scale={0.043} />
        <group name="WGT-rig_jawL001" position={[0.378, -0.429, 0.087]} rotation={[Math.PI / 2, 0, -0.549]} scale={0.043} />
        <group name="WGT-rig_jawR" position={[-0.486, -0.089, 0.028]} rotation={[-Math.PI / 2, 0, -0.051]} scale={-0.043} />
        <group name="WGT-rig_jawR001" position={[-0.378, -0.429, 0.087]} rotation={[-Math.PI / 2, 0, -0.549]} scale={-0.043} />
        <group name="WGT-rig_lidBL" position={[0.159, 0.074, 0.457]} rotation={[Math.PI / 2, 0, -0.34]} scale={0.043} />
        <group name="WGT-rig_lidBL001" position={[0.199, 0.051, 0.46]} rotation={[Math.PI / 2, 0, 0.009]} scale={0.043} />
        <group name="WGT-rig_lidBL002" position={[0.26, 0.05, 0.457]} rotation={[Math.PI / 2, 0, 0.038]} scale={0.043} />
        <group name="WGT-rig_lidBL003" position={[0.309, 0.064, 0.434]} rotation={[Math.PI / 2, 0, -0.076]} scale={0.043} />
        <group name="WGT-rig_lidBR" position={[-0.159, 0.074, 0.457]} rotation={[-Math.PI / 2, 0, -0.34]} scale={-0.043} />
        <group name="WGT-rig_lidBR001" position={[-0.199, 0.051, 0.46]} rotation={[-Math.PI / 2, 0, 0.009]} scale={-0.043} />
        <group name="WGT-rig_lidBR002" position={[-0.26, 0.05, 0.457]} rotation={[-Math.PI / 2, 0, 0.038]} scale={-0.043} />
        <group name="WGT-rig_lidBR003" position={[-0.309, 0.064, 0.434]} rotation={[-Math.PI / 2, 0, -0.076]} scale={-0.043} />
        <group name="WGT-rig_lidTL" position={[0.346, 0.084, 0.417]} rotation={[Math.PI / 2, 0, -0.616]} scale={0.043} />
        <group name="WGT-rig_lidTL001" position={[0.327, 0.107, 0.432]} rotation={[Math.PI / 2, 0, -0.44]} scale={0.043} />
        <group name="WGT-rig_lidTL002" position={[0.268, 0.131, 0.457]} rotation={[Math.PI / 2, 0, -0.029]} scale={0.043} />
        <group name="WGT-rig_lidTL003" position={[0.194, 0.12, 0.461]} rotation={[Math.PI / 2, 0, 0.14]} scale={0.043} />
        <group name="WGT-rig_lidTR" position={[-0.346, 0.084, 0.417]} rotation={[-Math.PI / 2, 0, -0.616]} scale={-0.043} />
        <group name="WGT-rig_lidTR001" position={[-0.327, 0.107, 0.432]} rotation={[-Math.PI / 2, 0, -0.44]} scale={-0.043} />
        <group name="WGT-rig_lidTR002" position={[-0.268, 0.131, 0.457]} rotation={[-Math.PI / 2, 0, -0.029]} scale={-0.043} />
        <group name="WGT-rig_lidTR003" position={[-0.194, 0.12, 0.461]} rotation={[-Math.PI / 2, 0, 0.14]} scale={-0.043} />
        <group name="WGT-rig_lipBL001" position={[0.069, -0.373, 0.601]} rotation={[Math.PI / 2, 0, -0.045]} scale={0.043} />
        <group name="WGT-rig_lipBR001" position={[-0.069, -0.373, 0.601]} rotation={[-Math.PI / 2, 0, -0.045]} scale={-0.043} />
        <group name="WGT-rig_lipTL001" position={[0.058, -0.331, 0.625]} rotation={[Math.PI / 2, 0, 0.094]} scale={0.043} />
        <group name="WGT-rig_lipsL" position={[0.162, -0.343, 0.537]} rotation={[Math.PI / 2, 0, 0.094]} scale={0.043} />
        <group name="WGT-rig_lipTR001" position={[-0.058, -0.331, 0.625]} rotation={[-Math.PI / 2, 0, 0.094]} scale={-0.043} />
        <group name="WGT-rig_lipsR" position={[-0.162, -0.343, 0.537]} rotation={[-Math.PI / 2, 0, 0.094]} scale={-0.043} />
        <group name="WGT-rig_nose" position={[0, 0.147, 0.594]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_nose001" position={[0, -0.078, 0.678]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_nose002" position={[0, -0.153, 0.716]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_nose003" position={[0, -0.209, 0.676]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_nose004" position={[0, -0.223, 0.63]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_nose005" position={[0, -0.266, 0.621]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_noseL" position={[0.079, 0.007, 0.531]} rotation={[Math.PI / 2, 0, 0.084]} scale={0.043} />
        <group name="WGT-rig_noseL001" position={[0.098, -0.165, 0.583]} rotation={[Math.PI / 2, 0, -0.122]} scale={0.043} />
        <group name="WGT-rig_noseR" position={[-0.079, 0.007, 0.531]} rotation={[-Math.PI / 2, 0, 0.084]} scale={-0.043} />
        <group name="WGT-rig_noseR001" position={[-0.098, -0.165, 0.583]} rotation={[-Math.PI / 2, 0, -0.122]} scale={-0.043} />
        <group name="WGT-rig_tongue" position={[0, -0.352, 0.474]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_tongue001" position={[0, -0.326, 0.358]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_tongue002" position={[0, -0.35, 0.201]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_tongue003" position={[0, -0.477, 0.099]} rotation={[Math.PI / 2, 0, 0]} scale={0.043} />
        <group name="WGT-rig_lipT" position={[0, -0.329, 0.644]} rotation={[Math.PI / 2, 0, -0.039]} scale={0.043} />
        <group name="WGT-rig_lipB" position={[0, -0.387, 0.633]} rotation={[Math.PI / 2, 0, 0.043]} scale={0.043} />
        <group name="WGT-rig_root" scale={2.071} />
      </group>
    </group>
  )
}

useGLTF.preload('path/AzuIdle.glb')
useGLTF.preload('path/AzuTalking.glb')