(function () {
    require.config({
        paths: {
            echarts: "echarts",
        },
    });

    require(
        [
            "echarts",
            "echarts/chart/main",
            "echarts/chart/map",    
        ],
        function (echarts, BMapExtension) {
            $('#main').css({
                height:$('body').height(),
                width:$('body').width()
            });

            // 初始化地图
            var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
                enableMapClick: false
            });
            var map = BMapExt.getMap();
            var container = BMapExt.getEchartsContainer();

            var startPoint = {
                x: 121.468055, // shanghai
                y: 31.23198
            };

            var point = new BMap.Point(startPoint.x, startPoint.y);
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom(true);
            // 地图自定义样式
            // map.setMapStyle({
            //     styleJson: [
            //         {
            //                   'featureType': 'land',     //调整土地颜色
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                             'color': '#081734'
            //                   }
            //         },
            //         {
            //                   'featureType': 'building',   //调整建筑物颜色
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                             'color': '#04406F'
            //                   }
            //         },
            //         {
            //                   'featureType': 'building',   //调整建筑物标签是否可视
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'highway',     //调整高速道路颜色
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                   'color': '#015B99'
            //                   }
            //         },
            //         {
            //                   'featureType': 'highway',    //调整高速名字是否可视
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'arterial',   //调整一些干道颜色
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                   'color':'#003051'
            //                   }
            //         },
            //         {
            //                   'featureType': 'arterial',
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'green',
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'water',
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                             'color': '#044161'
            //                   }
            //         },
            //         {
            //                   'featureType': 'subway',    //调整地铁颜色
            //                   'elementType': 'geometry.stroke',
            //                   'stylers': {
            //                   'color': '#003051'
            //                   }
            //         },
            //         {
            //                   'featureType': 'subway',
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'railway',
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'railway',
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'all',     //调整所有的标签的边缘颜色
            //                   'elementType': 'labels.text.stroke',
            //                   'stylers': {
            //                             'color': '#313131'
            //                   }
            //         },
            //         {
            //                   'featureType': 'all',     //调整所有标签的填充颜色
            //                   'elementType': 'labels.text.fill',
            //                   'stylers': {
            //                             'color': '#FFFFFF'
            //                   }
            //         },
            //         {
            //                   'featureType': 'manmade',   
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'manmade',
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'local',
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'local',
            //                   'elementType': 'labels',
            //                   'stylers': {
            //                   'visibility': 'off'
            //                   }
            //         },
            //         {
            //                   'featureType': 'subway',
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                             'lightness': -65
            //                   }
            //         },
            //         {
            //                   'featureType': 'railway',
            //                   'elementType': 'all',
            //                   'stylers': {
            //                             'lightness': -40
            //                   }
            //         },
            //         {
            //                   'featureType': 'boundary',
            //                   'elementType': 'geometry',
            //                   'stylers': {
            //                             'color': '#8b8787',
            //                             'weight': '1',
            //                             'lightness': -29
            //                   }
            //         }
            //     ]
            // });
            map.setMapStyle({style:'midnight'});
            // map.setMapStyle(
            //     {
            //       'styleJson': [
            //         {
            //           'featureType': 'water',
            //           'elementType': 'all',
            //           'stylers': {
            //             'color': '#031628'
            //           }
            //         },
            //         {
            //           'featureType': 'land',
            //           'elementType': 'geometry',
            //           'stylers': {
            //             'color': '#000102'
            //           }
            //         },
            //         {
            //           'featureType': 'highway',
            //           'elementType': 'all',
            //           'stylers': {
            //             'visibility': 'off'
            //           }
            //         },
            //         {
            //           'featureType': 'arterial',
            //           'elementType': 'geometry.fill',
            //           'stylers': {
            //             'color': '#000000'
            //           }
            //         },
            //         {
            //           'featureType': 'arterial',
            //           'elementType': 'geometry.stroke',
            //           'stylers': {
            //             'color': '#0b3d51'
            //           }
            //         },
            //         {
            //           'featureType': 'local',
            //           'elementType': 'geometry',
            //           'stylers': {
            //             'color': '#000000'
            //           }
            //         },
            //         {
            //           'featureType': 'railway',
            //           'elementType': 'geometry.fill',
            //           'stylers': {
            //             'color': '#000000'
            //           }
            //         },
            //         {
            //           'featureType': 'railway',
            //           'elementType': 'geometry.stroke',
            //           'stylers': {
            //             'color': '#08304b'
            //           }
            //         },
            //         {
            //           'featureType': 'subway',
            //           'elementType': 'geometry',
            //           'stylers': {
            //             'lightness': -70
            //           }
            //         },
            //         {
            //           'featureType': 'building',
            //           'elementType': 'geometry.fill',
            //           'stylers': {
            //             'color': '#000000'
            //           }
            //         },
            //         {
            //           'featureType': 'all',
            //           'elementType': 'labels.text.fill',
            //           'stylers': {
            //             'color': '#857f7f'
            //           }
            //         },
            //         {
            //           'featureType': 'all',
            //           'elementType': 'labels.text.stroke',
            //           'stylers': {
            //             'color': '#000000'
            //           }
            //         },
            //         {
            //           'featureType': 'building',
            //           'elementType': 'geometry',
            //           'stylers': {
            //             'color': '#022338'
            //           }
            //         },
            //         {
            //           'featureType': 'green',
            //           'elementType': 'geometry',
            //           'stylers': {
            //             'color': '#062032'
            //           }
            //         },
            //         {
            //           'featureType': 'boundary',
            //           'elementType': 'all',
            //           'stylers': {
            //             'color': '#465b6c'
            //           }
            //         },
            //         {
            //           'featureType': 'manmade',
            //           'elementType': 'all',
            //           'stylers': {
            //             'color': '#022338'
            //           }
            //         },
            //         {
            //           'featureType': 'label',
            //           'elementType': 'all',
            //           'stylers': {
            //             'visibility': 'off'
            //           }
            //         }
            //       ]
            //     }
            // );        

            option = {

                color: ['gold','aqua','lime'],
                title : {
                    text: '',
                    subtext: '',
                    x:'center',
                    textStyle : {
                        color: '#fff',
                        fontSize:20,
                        fontWeight:'bold',
                    }
                },
                tooltip : {
                    show: true,
                    trigger:'item',
                    hideDelay:4000,
                    formatter: function(d) {
                        var jw= 'longitude:'+d.value[0]+'<br/>'
                            jw += 'latitude:'+d.value[1]
                        return jw       
                    }
                },
                color:['gold','red'],
                legend:{
                    // data:['上班轨迹(甲)','Predict Route'],
                    data:['Predict Route'],
                    x:'left',
                    orient:'vertical',
                    padding:[30,15,15,30],
                    textStyle:{
                        fontSize:17,
                        color:'rgb(204,204,204)',
                    },
                    selected:{
                        // '上班轨迹(甲)':true,
                        'Predict Route':true,
                    },
                    selectedMode:'single',
                },
                /*
                toolbox: {
                    show : true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                       mark : {show: true},
                       dataView : {show: true, readOnly: false},
                       restore : {show: true},
                       saveAsImage : {show: true}
                    }
                },*/
                series : [

                    {
                        name:'Predict Route',
                        type:'map',
                        mapType: 'none',          
                        data:[],

                        markLine : {
                            Symbol:['none', 'arrow'],
                            symbolSize:['0', '0.1'],
                            smooth:true,
                            smooth:20,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                color: 'red',
                                normal: {
                                    color:function(param){
                                    return(param.data[0].value.colorValue);
                                    },
                                    borderWidth:3,
                                    lineStyle: {
                                        type: 'solid',
                                        width: 3,
                                        shadowBlur: 10
                                    },
                                    label:{show:false,value:'shanghai'}
                              }
                            },

                            data : [
                                      [{name:'s1_1'}, {name:'s1_2',value:{colorValue:'gold'}}],
                                      [{name:'s1_2'}, {name:'s1_3',value:{colorValue:'gold'}}],
                                      [{name:'s1_3'}, {name:'s1_4',value:{colorValue:'gold'}}],
                                      [{name:'s1_4'}, {name:'s1_5',value:{colorValue:'gold'}}],
                                      [{name:'s1_5'}, {name:'s1_6',value:{colorValue:'gold'}}],
                                      [{name:'s1_6'}, {name:'s1_7',value:{colorValue:'gold'}}],
                                      [{name:'s1_7'}, {name:'s1_8',value:{colorValue:'gold'}}],
                                      [{name:'s1_8'}, {name:'s1_9',value:{colorValue:'gold'}}],
                                      [{name:'s1_9'}, {name:'s1_10',value:{colorValue:'gold'}}],
                                      [{name:'s1_10'}, {name:'s1_11',value:{colorValue:'gold'}}], // sample 11214
                                      [{name:'s2_1'}, {name:'s2_2',value:{colorValue:'gold'}}],
                                      [{name:'s2_2'}, {name:'s2_3',value:{colorValue:'gold'}}],
                                      [{name:'s2_3'}, {name:'s2_4',value:{colorValue:'gold'}}],
                                      [{name:'s2_4'}, {name:'s2_5',value:{colorValue:'gold'}}],
                                      [{name:'s2_5'}, {name:'s2_6',value:{colorValue:'gold'}}],
                                      [{name:'s2_6'}, {name:'s2_7',value:{colorValue:'gold'}}],
                                      [{name:'s2_7'}, {name:'s2_8',value:{colorValue:'gold'}}],
                                      [{name:'s2_8'}, {name:'s2_9',value:{colorValue:'gold'}}],
                                      [{name:'s2_9'}, {name:'s2_10',value:{colorValue:'gold'}}],
                                      [{name:'s2_10'}, {name:'s2_11',value:{colorValue:'gold'}}], // sample 21189
                                      [{name:'s3_1'}, {name:'s3_2',value:{colorValue:'gold'}}],
                                      [{name:'s3_2'}, {name:'s3_3',value:{colorValue:'gold'}}],
                                      [{name:'s3_3'}, {name:'s3_4',value:{colorValue:'gold'}}],
                                      [{name:'s3_4'}, {name:'s3_5',value:{colorValue:'gold'}}],
                                      [{name:'s3_5'}, {name:'s3_6',value:{colorValue:'gold'}}],
                                      [{name:'s3_6'}, {name:'s3_7',value:{colorValue:'gold'}}],
                                      [{name:'s3_7'}, {name:'s3_8',value:{colorValue:'gold'}}],
                                      [{name:'s3_8'}, {name:'s3_9',value:{colorValue:'gold'}}],
                                      [{name:'s3_9'}, {name:'s3_10',value:{colorValue:'gold'}}],
                                      [{name:'s3_10'}, {name:'s3_11',value:{colorValue:'gold'}}], // sample 12
                                      [{name:'s4_1'}, {name:'s4_2',value:{colorValue:'gold'}}],
                                      [{name:'s4_2'}, {name:'s4_3',value:{colorValue:'gold'}}],
                                      [{name:'s4_3'}, {name:'s4_4',value:{colorValue:'gold'}}],
                                      [{name:'s4_4'}, {name:'s4_5',value:{colorValue:'gold'}}],
                                      [{name:'s4_5'}, {name:'s4_6',value:{colorValue:'gold'}}],
                                      [{name:'s4_6'}, {name:'s4_7',value:{colorValue:'gold'}}],
                                      [{name:'s4_7'}, {name:'s4_8',value:{colorValue:'gold'}}],
                                      [{name:'s4_8'}, {name:'s4_9',value:{colorValue:'gold'}}],
                                      [{name:'s4_9'}, {name:'s4_10',value:{colorValue:'gold'}}],
                                      [{name:'s4_10'}, {name:'s4_11',value:{colorValue:'gold'}}], // sample 908                
                                      // [{name:'s5_1'}, {name:'s5_2',value:{colorValue:'gold'}}],
                                      // [{name:'s5_2'}, {name:'s5_3',value:{colorValue:'gold'}}],
                                      // [{name:'s5_3'}, {name:'s5_4',value:{colorValue:'gold'}}],
                                      // [{name:'s5_4'}, {name:'s5_5',value:{colorValue:'gold'}}],
                                      // [{name:'s5_5'}, {name:'s5_6',value:{colorValue:'gold'}}],
                                      // [{name:'s5_6'}, {name:'s5_7',value:{colorValue:'gold'}}],
                                      // [{name:'s5_7'}, {name:'s5_8',value:{colorValue:'gold'}}],
                                      // [{name:'s5_8'}, {name:'s5_9',value:{colorValue:'gold'}}],
                                      // [{name:'s5_9'}, {name:'s5_10',value:{colorValue:'gold'}}],
                                      // [{name:'s5_10'}, {name:'s5_11',value:{colorValue:'gold'}}], // sample 10455
                            ]
                        },
                        // destination
                        markPoint:{
                              symbol:'image://./icon/location.png',
                              symbolSize:function(v){
                                  return v/3
                              },
                              effect:{
                                  show:true,
                                  type:'bounce',
                                  period:3,               
                              },            
                              // symbol:'emptyCircle',
                              // symbolSize:function(v){
                              //     return v/5
                              // },
                              // effect:{
                              //     show:true,
                              //     type:'scale',
                              //     period:10,
                              //     color:'gold',               
                              // },
                              itemStyle:{
                                  normal:{
                                      label:{
                                          show:false,
                                      },
                                  },
                                  emphasis:{
                                      label:{
                                          show:false,
                                      },
                                  },
                              },
                              data:[
                                  {name:'s1_dest',value:50,
                                     tooltip:{
                                         formatter:'Point:real destination<br/>Distance(Haversine):1.429km'
                                     },
                                  },
                                  {name:'s2_dest',value:50,
                                     tooltip:{
                                         formatter:'Point:real destination<br/>Distance(Haversine):0.927km'
                                     },
                                  },
                                  {name:'s3_dest',value:50,
                                     tooltip:{
                                         formatter:'Point:real destination<br/>Distance(Haversine):0.629km'
                                     },
                                  },
                                  {name:'s4_dest',value:50,
                                     tooltip:{
                                         formatter:'Point:real destination<br/>Distance(Haversine):1.044km'
                                     },
                                  },                    
                              ],
                        },
                        // points dict
                        geoCoord:{
                            's1_1':[121.43313,31.198628],
                            's1_2':[121.436975,31.196218],
                            's1_3':[121.440676,31.195415],
                            's1_4':[121.447719,31.195785],
                            's1_5':[121.453683,31.198071],
                            's1_6':[121.484082,31.209684],
                            's1_7':[121.485483,31.210487],
                            's1_8':[121.487962,31.21061],
                            's1_9':[121.488788,31.208571],
                            's1_10':[121.490944,31.210857],
                            's1_11':[121.490836,31.213142],
                            's1_dest':[121.492533,31.22408],//  

                            's2_1':[121.385555,31.11457],
                            's2_2':[121.395041,31.113086],
                            's2_3':[121.396658,31.111169],
                            's2_4':[121.397916,31.108324],
                            's2_5':[121.398958,31.105974],
                            's2_6':[121.371775,31.07706],
                            's2_7':[121.35636,31.071678],
                            's2_8':[121.348994,31.071183],
                            's2_9':[121.351797,31.0671],
                            's2_10':[121.342598,31.070131],
                            's2_11':[121.345724,31.063419],
                            's2_dest':[121.350533,31.07408],//  

                            's3_1':[121.330759,31.201223],
                            's3_2':[121.316961,31.198999],
                            's3_3':[121.310924,31.2074],
                            's3_4':[121.309775,31.223459],
                            's3_5':[121.318111,31.225436],
                            's3_6':[121.428207,31.248902],
                            's3_7':[121.454941,31.263719],
                            's3_8':[121.467589,31.267176],
                            's3_9':[121.470176,31.260756],
                            's3_10':[121.469026,31.255076],
                            's3_11':[121.457815,31.255076],  
                            's3_dest':[121.462533,31.252408],//

                            's4_1':[121.49604,31.228217],
                            's4_2':[121.498376,31.227599],
                            's4_3':[121.509946,31.228093],
                            's4_4':[121.514689,31.227538],
                            's4_5':[121.519288,31.230378],
                            's4_6':[121.791906,31.180775],
                            's4_7':[121.798482,31.17923],
                            's4_8':[121.801967,31.175152],
                            's4_9':[121.809046,31.168725],
                            's4_10':[121.809298,31.16786],
                            's4_11':[121.809729,31.166562],  
                            's4_dest':[121.819862,31.155067]//                                         
                        }
                    }
                ]
            };


        var myChart = BMapExt.initECharts(container);
        window.onresize = myChart.onresize;
        BMapExt.setOption(option);
        }
    );

})();