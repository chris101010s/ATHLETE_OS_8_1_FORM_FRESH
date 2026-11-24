import React,{useEffect,useState} from 'react';
import {View,Text,ScrollView,Pressable,ActivityIndicator,StatusBar,KeyboardAvoidingView,Platform,Alert} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import {AthleteProvider,useAthlete} from './src/data/context';
import {HomeScreen} from './src/screens/Home';
import {WeightScreen} from './src/screens/Weight';
import {GymScreen} from './src/screens/Gym';
import {InsightsScreen} from './src/screens/Insights';
import {JournalScreen} from './src/screens/Journal';
import {MoreScreen} from './src/screens/More';
import {GlassBar,Title,Card,Button,Field,color,Muted} from './src/components/Design';
import Svg,{Path,Circle,Line,Rect} from 'react-native-svg';
import * as DocumentPicker from 'expo-document-picker';
import {File,Paths} from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {SetupScreen} from './src/screens/Setup';
import {parseAthleteBackup} from './src/data/validation';
const tabs=[['home','Heute'],['gym','Training'],['weight','Fortschritt'],['journal','Journal'],['more','Mehr']] as const;
function TabIcon({name,active}:{name:string;active:boolean}){
 const ink=active?color.blue:'#8A97A8';const common={stroke:ink,strokeWidth:2,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
 return <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...common}>
 {name==='home'?<Path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>:
 name==='gym'?<><Line x1="6" y1="12" x2="18" y2="12"/><Path d="M4 7v10 M7 6v12 M17 6v12 M20 7v10"/></>:
 name==='weight'?<><Path d="M4 18V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><Path d="m9 12 3-4 3 4"/></>:
 name==='journal'?<><Rect x="3.5" y="12" width="4" height="8" rx="1"/><Rect x="10" y="7" width="4" height="13" rx="1"/><Rect x="16.5" y="3" width="4" height="17" rx="1"/></>:
 <><Circle cx="5" cy="12" r="1.6"/><Circle cx="12" cy="12" r="1.6"/><Circle cx="19" cy="12" r="1.6"/></>}
 </Svg>
}

function Main(){const {data,ready,saving,fault,faultOrigin,replace,retrySave}=useAthlete();const [tab,setTab]=useState<string>('home');const [now,setNow]=useState(Date.now());const [progress,setProgress]=useState(false);
 useEffect(()=>{if(!data.live)return;const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[data.live?.id]);
 if(!ready)return <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:color.bg}}><ActivityIndicator color={color.blue}/><Text style={{color:color.muted,marginTop:13}}>Daten werden geladen …</Text></View>;
 if(fault)return <ScrollView contentContainerStyle={{flexGrow:1,padding:30,justifyContent:'center',backgroundColor:color.bg}}><Text style={{fontWeight:'800',fontSize:24,color:'#B44E49'}}>Speicherfehler</Text><Text style={{marginTop:15,marginBottom:14,color:color.ink}}>{fault}</Text><Muted>Deine gespeicherten Daten werden nicht automatisch gelöscht. Bei einem vorübergehenden Schreibfehler kannst du es erneut versuchen oder ein eigenes Backup einspielen.</Muted>{faultOrigin==='save'?<View style={{marginTop:18,marginBottom:8}}><Button secondary title="Speichern erneut versuchen" onPress={retrySave}/><Button secondary title="Aktuelle Eingaben als Notfall-JSON exportieren" onPress={()=>void (async()=>{try{const f=new File(Paths.cache,'FORM_notfall.json');f.create({overwrite:true});await f.write(JSON.stringify({format:'ATHLETE-OS-Backup',data}));await Sharing.shareAsync(f.uri,{mimeType:'application/json'});}catch(e){Alert.alert('Export fehlgeschlagen',String(e))}})()}/></View>:null}<View style={{marginTop:12}}><Button title="Backup zur Wiederherstellung auswählen" onPress={()=>void (async()=>{try{const result=await DocumentPicker.getDocumentAsync({type:['application/json','text/plain','application/octet-stream'],copyToCacheDirectory:true});if(result.canceled)return;if((result.assets[0].size??0)>15000000)throw Error('Backup zu groß.');const raw=await new File(result.assets[0].uri).text();const restored=parseAthleteBackup(raw);Alert.alert('Backup einspielen?', 'Die derzeitigen App-Daten werden durch dein gewähltes Backup ersetzt.',[{text:'Abbrechen',style:'cancel'},{text:'Wiederherstellen',onPress:()=>replace(restored)}]);}catch(e){Alert.alert('Backup konnte nicht gelesen werden',String((e as Error).message))}})()}/></View></ScrollView>;
 if(!data.profile.onboarded)return <SetupScreen/>;
 return <View style={{flex:1,backgroundColor:color.bg}}>{saving&&<Text accessibilityLiveRegion="polite" style={{color:color.muted,fontSize:12,textAlign:'center'}}>Lokal speichern …</Text>}<ScrollView key={tab} keyboardShouldPersistTaps="handled" contentContainerStyle={{paddingHorizontal:19,paddingTop:24,paddingBottom:data.live&&tab!=='gym'?190:125}}>
 {tab==='home'?<HomeScreen go={setTab}/>:tab==='gym'?<GymScreen/>:tab==='weight'||tab==='insights'?<><View style={{flexDirection:'row',gap:8,marginBottom:16}}><View style={{flex:1}}><Button small secondary={!progress&&tab!=='insights'?false:true} title="Gewicht" onPress={()=>{setProgress(false);setTab('weight')}}/></View><View style={{flex:1}}><Button small secondary={!progress&&tab!=='insights'} title="Analyse" onPress={()=>{setProgress(true);setTab('weight')}}/></View></View>{progress||tab==='insights'?<InsightsScreen/>:<WeightScreen/>}</>:tab==='journal'?<JournalScreen/>:<MoreScreen initialArea="Einstellungen"/>}
 </ScrollView>
 <View style={{position:'absolute',bottom:0,left:0,right:0}}>{data.live&&tab!=='gym'&&<Pressable accessibilityRole="button" onPress={()=>setTab('gym')} style={{backgroundColor:color.ink,marginHorizontal:15,marginBottom:8,borderRadius:12,padding:13}}><Text style={{color:color.white,fontWeight:'700'}}>{data.live.name} · {Math.max(0,Math.floor(((data.live.pausedAt||now)-Date.parse(data.live.startedAt)-(data.live.pausedMs||0))/60000))} min · {data.live.sets.length} Sätze</Text><Text style={{color:'#ECA58E'}}>{data.live.pausedAt?'Unterbrochen · ':''}Fortsetzen → {data.live.activeExerciseId?` · ${data.exercises.find(e=>e.id===data.live?.activeExerciseId)?.name||data.live.activeExerciseId.replace(/^fedb:/,'').replace(/_/g,' ')}`:''}{data.live.restUntil?` · Pause ${Math.max(0,Math.ceil((data.live.restUntil-now)/1000))} s`:''}</Text></Pressable>}<GlassBar>{tabs.map(([key,label])=><Pressable accessibilityRole="tab" accessibilityState={{selected:tab===key||(tab==='insights'&&key==='weight')}} onPress={()=>setTab(key)} key={key} style={{flex:1,alignItems:'center',paddingTop:4,paddingBottom:2,gap:2}}><TabIcon name={key} active={tab===key}/><Text style={{fontSize:10,fontWeight:tab===key?'800':'600',color:tab===key?color.blue:color.muted}}>{label}</Text></Pressable>)}</GlassBar></View>
 </View>
}
export default function App(){return <SafeAreaProvider><StatusBar barStyle="dark-content"/><SafeAreaView style={{flex:1,backgroundColor:color.bg}} edges={['top','bottom']}><AthleteProvider><Main/></AthleteProvider></SafeAreaView></SafeAreaProvider>}
